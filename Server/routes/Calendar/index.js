const router = require('express').Router()
const middleware = require('../../middleware')
const mongoose = require('mongoose')

module.exports = (router, controller) => {
  router.post('/calendars', middleware.ensureToken, function(req, res, err){
    controller.create(req.body).then(calendar => {
      res.status(201).send(calendar)
    }).catch(err => {
      console.log(err)
      res.status(500).send('Couldnt create view')
    })
  })


  router.get('/calendars', function(req, res, err){
    controller.getCalendars().then(calendars => {
      console.log(calendars)
      res.status(200).send(calendars)
    }).catch(err => {
      console.log(err)
    })
  })

  router.delete('/calendars/:calId', function(req, res, err){
    console.log(req.params.calId)
    controller.deleteCalendars(req.params.calId).then(x => {
      res.status(200).send('Calendar successfully deleted')
    }).catch(err => {
      res.status(404).send('Calendar does not exist')
    })
  })
}