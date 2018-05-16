const mongoose = require('mongoose')
const User = require('../models/User')
const Invite = require('../models/Invite')
const jwt = require('jsonwebtoken')
const sha256 = require('sha256')
const request = require('request')
const userController = {}

userController.create = (user) => {
  return new Promise((resolve, reject) => {
    User.findOne({"email": user.email}, (err, item) => {
      if(item) reject({
        status: 403,
        message: 'This user already exists'
      })
      else {
        Invite.findOne({$and:[
          {"email": user.email},
          {"code": user.code},
          {"consumed": false}
        ]}, (err, invite) => {
          if(invite){
            delete user.code
            let hashPassword = sha256(user.password+process.env.HASH_SECRET)
            user.password = hashPassword
            let newUser = new User(user)
            newUser.save((err, item) => {
              if(err){
                reject(err)
              }
              resolve(item)
            })
            Invite.remove(
              {"email": user.email}
            ).exec(function(err, result){
              if(err) {
                reject(err)
              } else resolve(result)
            })
          }
        })
      }
    })
  })
}

userController.login = (userConnecting) => {
  return new Promise((resolve, reject) => {
    User.findOne({"email": userConnecting.email}, (err, user) => {
      if(user){
        if(user.password === sha256(userConnecting.password+process.env.HASH_SECRET) && user.email === userConnecting.email){
          let token = jwt.sign({"_id":user._id, "email":user.email}, process.env.SECRET_KEY)
          User.findOneAndUpdate({"email": userConnecting.email}, 
            {$set:{lastConnection: new Date()}}, function(err, d){
              if(err) console.log(err)
            })
          return resolve({
            _id: user._id,
            googleEmail: user.googleEmail,
            token: token
          })
        } else {
          let error = new Error()
          error.message = 'Invalid email or password'
          error.status = 403
          return reject(error)
        }
      } else {
        let error = new Error('User '+userConnecting.email+' does not exist')
        error.status = 404
        return reject(error)
      }
    })
  })
}

userController.loginWithGoogle = (req) => {
  return new Promise((resolve, reject) => {
    const data = {
      code: req.body.code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: req.headers.origin,
      scope: ['people'],
      grant_type: 'authorization_code'
    }
    request({
      method:'post',
      url:'https://www.googleapis.com/oauth2/v4/token',
      form: data
    },(err, response) => {
      if(err) {
        let error = new Error()
        error.message = 'Invalid credentials'
        error.status = 401
        return reject(error)
      }
      else {
        const resBody = JSON.parse(response.body)
        const access_token = resBody.access_token
        request({
          method:'get',
          url: `https://www.googleapis.com/plus/v1/people/me?access_token=${access_token}`
        }, (err, profileResponse) => {
          if(err) {
            let errorProfile = new Error()
            errorProfile.message = 'Invalid token'
            errorProfile.status = 401
            return reject(errorProfile)
          }
          else {
            const profileBody = JSON.parse(profileResponse.body)
            const primaryEmail = profileBody.emails[0].value
            User.findOne({googleEmail: primaryEmail}, (err, user) => {
              if(user) {
                let token = jwt.sign({"_id":user._id, "email":user.email}, process.env.SECRET_KEY)
                User.findOneAndUpdate({"email": user.email}, 
                  {$set:{lastConnection: new Date()}}, function(err, d){
                    if(err){
                      let errorUpdate = new Error()
                      errorUpdate.message = 'Error updating user information'
                      errorUpdate.status = 500
                      return reject(errorUpdate)
                    }
                    else return resolve({
                      _id: user._id,
                      googleEmail: user.googleEmail,
                      token: token
                    })
                })
              } else {
                let errorUser = new Error()
                errorUser.message = 'User not found'
                errorUser.status = 404
                return reject(errorUser)
              }
            })
          }
        })
      }
    })
  })
}

userController.findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    User.findOne({"email": email}, (err, user) => {
      if(user)
         reject({
          status: 403,
          message: 'This user already exists'
        })
      else {
        resolve(email)
      }
    })
  })
}

userController.findById = (id) => {
  return new Promise((resolve, reject) => {
    User.findOne({_id: id}, (err, user) => {
      if(user)
        resolve(user)
      else {
        reject({
          status: 403,
          message: 'User not found'
        })
      }
    })
  })
}


module.exports = userController