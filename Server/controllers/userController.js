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
        status: 401,
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
          } else reject('Invite not found')
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
          return reject('Invalid email or password')
        }
      } else {
        return reject('User not found')
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
        return reject(err)
      }
      else {
        const resBody = JSON.parse(response.body)
        const access_token = resBody.access_token
        request({
          method:'get',
          url: `https://www.googleapis.com/plus/v1/people/me?access_token=${access_token}`
        }, (err, profileResponse) => {
          if(err) {
            return reject(err)
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
                      return reject(err)
                    }
                    else return resolve({
                      _id: user._id,
                      googleEmail: user.googleEmail,
                      token: token
                    })
                })
              } else {
                return reject('User not found')
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
         reject('User already exists')
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
        reject('User not found')
      }
    })
  })
}


module.exports = userController