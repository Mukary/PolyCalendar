const router = require('express').Router()
const middleware = require('../../middleware')
const mongoose = require('mongoose')

module.exports = (router, controller) => {


  router.get('/verify', middleware.ensureToken,function(req, res, err){
    controller.checkUser(req.data._id).then(user => {
      res.status(200).send('User authenticated')
    }).catch(err => {
      res.status(401).send('Unauthorized')
    })
  })

  router.post('/oauth', middleware.ensureToken, function(req, res, err){
    console.log(req.body)
    controller.googleOAuth(req).then(response => {
      res.status(response.code).send(response)
    }).catch(err => {
      console.log(err)
      res.status(401).send('Unauthorized')
    })
  })

  router.post('/logoutGoogle', middleware.ensureToken, function(req, res, err){
    controller.unlinkGoogleAccount(req).then(response => {
      res.status(response.code).send(response.message)
    }).catch(err => {
      res.status(400).send('Something went wrong when unlinking account')
    })
  })
}