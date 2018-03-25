const router = require('express').Router()
const userController = require('../../controllers/userController')
const mongoose = require('mongoose')

module.exports = (router, userController) => {
router.post('/register', function(req, res, err) {
  
    let user = req.body
    userController.create(user).then( () => {
      return res.status(201).send('User successfully registered.')
    }).catch(err => {
      console.log(err)
      return res.status(400).send('Bad request')
    })
  })
  
  router.post('/login', function(req, res, err) {
    let userConnecting = req.body
    userController.login(userConnecting).then(token => {
      return res.status(201).json({
        token: token
      })
    }).catch(err => {
      return res.status(err.status).send(err.message)
    })
  })
}