const router = require('express').Router()
const middleware = require('../../middleware')
const mongoose = require('mongoose')
const ical = require('ical')

module.exports = (router, controller) => {
  router.post('/calendars', middleware.ensureToken, function(req, res, err){
    console.log(req.body.url)
    let events = {}
    ical.fromURL(req.body.url, {}, function(err, data){
      events = data
      for(let x in data){
        console.log("ELEM OF DATA")
        console.log(data[x])
      }
      controller.create(req.body, events).then(calendar => {
        res.status(201).send(calendar)
      }).catch(err => {
        console.log(err)
        res.status(500).send('Couldnt create view')
      })
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
    controller.deleteCalendar(req.params.calId).then(x => {
      res.status(200).send('Calendar successfully deleted')
    }).catch(err => {
      res.status(404).send('Calendar does not exist')
    })
  })
}