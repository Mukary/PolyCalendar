const mongoose = require('mongoose')
const User = require('../models/User')
const Invite = require('../models/Invite')
const jwt = require('jsonwebtoken')
const sha256 = require('sha256')
const userController = {}

userController.create = (user) => {
  return new Promise((resolve, reject) => {
    console.log("userController")
    console.log(user)
    User.findOne({"email": user.email}, (err, item) => {
      if(user) reject({
        status: 403,
        message: 'This user already exists'
      })
      else {
        console.log(user)
        Invite.findOne({$and:[
          {"email": user.email},
          {"code": code},
          {"consumed": false}
        ]}, (err, invite) => {
          if(invite){
            console.log("Invite found")
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
          let token = jwt.sign({"sub":user.email, "name":user.firstname}, process.env.SECRET_KEY)
          return resolve(token)
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
        console.log('New user')
        resolve(email)
      }
    })
  })
}


module.exports = userController