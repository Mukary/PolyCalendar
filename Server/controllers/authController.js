const mongoose = require('mongoose')
const User = require('../models/User')
const request = require('request')
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

authController.googleOAuth = (req) => {
  return new Promise((resolve, reject) => {
    console.log(req.body.code)
    const data = {
      code: req.body.code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: req.headers.origin,
      scope: ['https://www.googleapis.com/auth/calendar.readonly'],
      grant_type: 'authorization_code'
    }
    request({
      method:'post',
      url:'https://www.googleapis.com/oauth2/v4/token',
      form: data
    }, (err, response) => {
        const jBody = JSON.parse(response.body)
        const access_token = jBody.access_token        
        request({
          method:'get',
          url:`https://www.googleapis.com/calendar/v3/users/me/calendarList?&minAccessRole=owner&access_token=${access_token}`
        }, (err, responseToken) => {
         const body2 = JSON.parse(responseToken.body)
         const calendars = body2.items
         console.log("================= LISTING ALL EVENTS FOR EACH CALENDAR =================")
         calendars.forEach(calendar => {
           request({
            method:'get',
            url:`https://www.googleapis.com/calendar/v3/calendars/${calendar.id}/events?&access_token=${access_token}`
          }, (err, response3) => {
              console.log(response3.body)
          })
         })
        })
    })
  })
}

module.exports = authController