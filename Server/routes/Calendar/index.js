const router = require('express').Router()
const middleware = require('../../middleware')
const mongoose = require('mongoose')
const ical = require('ical')

module.exports = (router, controller) => {
  router.post('/calendars', middleware.ensureToken, function(req, res, err){
    if(req.body.isFile) {
      let fileContent = ical.parseICS(req.body.fileContent)
      controller.create(req.body, fileContent, req.data._id).then(calendar => {
        res.status(201).send(calendar)
      }).catch(err => {
          console.log(err)
          res.status(500).status('Couldnt create calendar from this file')
      })
    } else {
      let events = {}
      ical.fromURL(req.body.url, {}, function(err, data){
        events = data
        controller.create(req.body, events, req.data._id).then(calendar => {
          res.status(201).send(calendar)
        }).catch(err => {
          console.log(err)
          res.status(500).send('Couldnt create calendar')
        })
      })
    }
  })

  router.put('/calendars/:calendarId', middleware.ensureToken, function(req, res, err){
    controller.update(req.body.name, req.params.calendarId, req.data._id).then(calendar => {
      res.status(200).send(calendar)
    }).catch(err => {
      console.log(err)
      res.status(500).send('Couldnt update calendar')
    })
  })


  router.get('/calendars', middleware.ensureToken, function(req, res, err){
    controller.getCalendars(req.data._id).then(calendars => {
      res.status(200).send(calendars)
    }).catch(err => {
      console.log(err)
      res.status(404).send('Calendars not found')
    })
  })

  router.get('/calendars/:calId', middleware.ensureToken, function(req, res, err){
    controller.getCalendar(req.params.calId, req.data._id).then(calendar => {
      res.status(200).send(calendar)
    }).catch(err => {
      res.status(404).send('Calendar not found')
    })
  })

  router.get('/calendars/:calId/download', function(req, res, err){
    controller.download(req.params.calId).then(fileContent => {
      res.setHeader('Content-type', "text/calendar")      
      res.setHeader('Content-disposition', 'attachment; filename=basic.ics')
      res.status(200).send(fileContent)
    }).catch(err => {
      res.status(404).send('Calendar file not found')
    })
  })

  router.delete('/calendars/:calId', middleware.ensureToken, function(req, res, err){
    controller.deleteCalendar(req.params.calId, req.data._id).then(x => {
      res.status(200).send('Calendar successfully deleted')
    }).catch(err => {
      res.status(404).send('Calendar does not exist')
    })
  })
}