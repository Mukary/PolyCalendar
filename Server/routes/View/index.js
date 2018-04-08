const router = require('express').Router()
const middleware = require('../../middleware')
const mongoose = require('mongoose')

module.exports = (router, controller) => {
  router.post('/views', middleware.ensureToken, function(req, res, err){
    controller.create(req.body).then(view => {
      res.status(201).send(view)
    }).catch(err => {
      console.log(err)
      res.status(500).send('Couldnt create view')
    })
  })


  router.get('/views', function(req, res, err){
    controller.getViews().then(views => {
      console.log(views)
      res.status(200).send(views)
    }).catch(err => {
      console.log(err)
    })
  })

  router.get('/views/:viewId', function(req, res, err){
    controller.getView(req.params.viewId).then(view => {
      res.status(200).send(view)
    }).catch(err => {
      res.status(404).send('View not found')
    })
  })

  router.put('/views/:viewId', function(req, res, err){
    controller.updateView(req.params.viewId, req.body.calendars, req.body.action).then(view => {
      res.status(200).send(view)
    }).catch(err => {
      res.status(404).send('Couldnt update view, not found')
    })
  })

  router.delete('/views/:viewId', function(req, res, err){
    console.log(req.params.viewId)
    controller.deleteView(req.params.viewId).then(x => {
      res.status(200).send('View successfully deleted')
    }).catch(err => {
      res.status(404).send('View does not exist')
    })
  })
}