const router = require('express').Router()
const middleware = require('../../middleware')
const mongoose = require('mongoose')

module.exports = (router, controller) => {


  router.get('/verify', middleware.ensureToken,function(req, res, err){
    controller.checkUser(req.data._id).then(user => {
      res.status(200).send('User authenticated')
    }).catch(err => {
      console.log(err)
      res.status(403).send('Access forbidden')
    })
  })

  router.post('/oauth', middleware.ensureToken, function(req, res, err){
    controller.googleOAuth(req).then(res => {
      console.log("GOOGLE")
      console.log(res)
    })
  })
}