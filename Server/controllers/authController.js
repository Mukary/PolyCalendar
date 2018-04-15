const mongoose = require('mongoose')
const User = require('../models/User')
const authController = {}

authController.checkUser = (userId) => {
  return new Promise((resolve, reject) => {
    User.findOne({_id: userId}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = authController