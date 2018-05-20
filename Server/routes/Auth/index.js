const router = require('express').Router()
const middleware = require('../../middleware')
const mongoose = require('mongoose')

module.exports = (router, controller) => {


  router.get('/verify', middleware.ensureToken,function(req, res, err){
    controller.checkUser(req.data._id).then(user => {
      res.status(200).send('User authenticated')
    }).catch(err => {
      console.log(err)
      res.status(err.status).send(err.message)
    })
  })

  router.post('/oauth', middleware.ensureToken, function(req, res, err){
    console.log(req.body)
    controller.googleOAuth(req).then(response => {
      res.status(response.code).send(response)
    }).catch(err => {
      console.log(err)
      res.status(err.status).send(err.message)
    })
  })

  router.post('/logoutGoogle', middleware.ensureToken, function(req, res, err){
    controller.unlinkGoogleAccount(req).then(response => {
      res.status(response.code).send(response.message)
    }).catch(err => {
      res.status(err.status).send(err.message)
    })
  })
}