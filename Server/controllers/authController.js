const mongoose = require('mongoose')
const User = require('../models/User')
const request = require('request')
const authController = {}
const calendarController = require('./calendarController')

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
    const data = {
      code: req.body.code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: req.headers.origin,
      scope: ['people','https://www.googleapis.com/auth/calendar.readonly'],
      grant_type: 'authorization_code'
    }
    request({
      method:'post',
      url:'https://www.googleapis.com/oauth2/v4/token',
      form: data
    }, (err, response) => {
        if(err) return reject(err)
        const jBody = JSON.parse(response.body)
        const access_token = jBody.access_token
        request({
          method:'get',
          url:`https://www.googleapis.com/plus/v1/people/me?access_token=${access_token}`
        }, (err, profileResponse) => {
          if (err) return reject(err)
          else {
            const profileBody = JSON.parse(profileResponse.body)
            const email = profileBody.emails[0].value
            User.findOne({googleEmail: email}, (err, user) => {
              if(user) return reject ('This google account is already linked to a user')
              else {
                User.findOneAndUpdate({_id: req.data._id}, {$set: {googleEmail: email}}, {new: true}, (err, user) =>{
                  if(err) return reject(err)
                  else resolve({
                    code: 201,
                    message: 'Successfully linked account',
                    email: user.googleEmail
                  })
                })
                request({
                  method:'get',
                  url:`https://www.googleapis.com/calendar/v3/users/me/calendarList?minAccessRole=owner&access_token=${access_token}`
                }, (err, responseToken) => { 
                 if(err) return reject(err)
                 else {
                  const body2 = JSON.parse(responseToken.body)
                  const calendars = body2.items
                  if(calendars == undefined) return reject('Unauthorized')
                  else {
                    let newCalendars = []
                    let calendarNum = 0
                    calendars.forEach((calendar) => {
                      request({
                        method:'get',
                        url:`https://www.googleapis.com/calendar/v3/calendars/${calendar.id}/events?&access_token=${access_token}`
                      }, (err, response3) => {
                          const body3 = JSON.parse(response3.body)
                          let events = body3.items
                          let calendarToSave = {
                            title: calendar.summary,
                            url: '',
                            fileContent: '',
                            isFile: false
                          }
                          let eventsToSave = []
                          events.forEach(event => {
                            let ev = {
                              summary: event.summary,
                              start: event.start['dateTime'],
                              end: event.end['dateTime'],
                              calendar: calendar.id,
                              description: ''
                            }
                            eventsToSave.push(ev)
                            if(event.description != undefined) ev.description = event.description
                          })
                          calendarController.create(calendarToSave, eventsToSave, req.data._id)
                      })
                    })
                  }
                 }
                })
              }
            })
          }
        })
    })
  })
}

authController.unlinkGoogleAccount = (req) => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({_id: req.data._id}, {$set: {googleEmail: ''}}, {new: true}, (err, user) => {
      if(err) reject(err)
      else resolve({
        code: 201,
        message: 'Account successfully unlinked'
      })
    })
  })
}

module.exports = authController