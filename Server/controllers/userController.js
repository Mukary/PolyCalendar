const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const encrypt = require('../utils/encrypt')
const userController = {}

userController.create = (user) => {
  return new Promise((resolve, reject) => {
    let plainPassword = user.password
    bcrypt.hash(plainPassword, 10, function(err, hash){
      if(err) return reject(err)
      user.password = hash
      let newUser = new User(user)
      newUser.save(err => {
        if(err) return reject(err)
        return resolve(user)
      })
    })
  })
}

userController.login = (userConnecting) => {
  return new Promise((resolve, reject) => {
    User.findOne({"email": userConnecting.email}, (err, user) => {
      if(user){
        let hashPasswordA
        bcrypt.hash(userConnecting.password, 10, function(err, hash){
          hashPasswordA=hash
        })
        if(user.password === hashPasswordA && user.email === userConnecting.email){
          return resolve("HAHAHA")
        } else {
          console.log("oleola")
          let error = new Error()
          error.message = 'Invalid email or password'
          error.status = 403
          return reject(error)
        }
      } else {
        console.log("pas de mongo")
        let error = new Error('User '+userConnecting.email+' does not exist')
        error.status = 404
        return reject(error)
      }
    })
  })
}


module.exports = userController