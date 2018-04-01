const router = require('express').Router()
const middleware = require('../../middleware')
const mongoose = require('mongoose')

module.exports = (router, controller) => {
  router.post('/views', middleware.ensureToken, function(req, res, err){
    controller.create(req.body).then(view => {
      res.status(201).send({
        title: view.title,
        color: view.color
      })
    }).catch(err => {
      console.log(err)
      res.status(500).send('Couldnt create view')
    })
  })
}