const mongoose = require('mongoose')
const User = require('../models/User')
const Invite = require('../models/Invite')
const jwt = require('jsonwebtoken')
const sha256 = require('sha256')
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