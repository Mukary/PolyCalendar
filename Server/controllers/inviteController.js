const mongoose = require('mongoose')
const sha256 = require('sha256')
const Invite = require('../models/Invite')
const User = require('../models/User')
const inviteController = {}

inviteController.create = (email) => {
  return new Promise((resolve, reject) => {
    User.findOne({"email": email}, (err, user) => {
      if(user)
         reject({
          status: 403,
          message: 'This user already exists'
        })
      else {
        let invite = new Invite({
          email: email,
          code: sha256(Date.now().toString()),
          consumed: false
        })
        invite.save((err, item) => {
          if(err) reject(err)
          resolve(item)
        })
      }
    })
  })
}

inviteController.verify = (email, inviteCode) => {
  return new Promise((resolve, reject) => {
    Invite.findOne($and[
      {"email": email},
      {"code": code},
      {"consumed": false}
    ], (err, invite) => {
      if(invite)
        resolve(invite)
      else reject(err)
    })
  })
}


module.exports = inviteController