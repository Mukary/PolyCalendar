const router = require('express').Router()
const middleware = require('../../middleware')
const mongoose = require('mongoose')

module.exports = (router, controller) => {
  router.post('/views', middleware.ensureToken, function(req, res, err){
    controller.create(req.body, req.data._id).then(view => {
      res.status(201).send(view)
    }).catch(err => {
      console.log(err)
      res.status(500).send('Couldnt create view')
    })
  })


  router.get('/views', middleware.ensureToken, function(req, res, err){
    controller.getViews(req.data._id).then(views => {
      console.log(views)
      res.status(200).send(views)
    }).catch(err => {
      console.log(err)
    })
  })

  router.get('/views/:viewId', middleware.ensureToken, function(req, res, err){
    controller.getView(req.params.viewId, req.data._id).then(view => {
      res.status(200).send(view)
    }).catch(err => {
      console.log(err)
      res.status(404).send('View not found')
    })
  })

  router.get('/views/:viewId/export', function(req, res, err){
    controller.exportView(req.params.viewId).then(view => {
      res.setHeader('content-type', 'text/calendar')
      res.status(200).send(view)
    })
  })

  router.put('/views/:viewId', middleware.ensureToken, function(req, res, err){
    controller.updateView(req.params.viewId, req.body.calendars, req.data._id, req.body.action).then(view => {
      res.status(200).send(view)
    }).catch(err => {
      res.status(404).send('Couldnt update view, not found')
    })
  })

  router.delete('/views/:viewId', middleware.ensureToken, function(req, res, err){
    controller.deleteView(req.params.viewId, req.data._id).then(x => {
      res.status(200).send('View successfully deleted')
    }).catch(err => {
      res.status(404).send('View does not exist')
    })
  })

  router.get('/views/share/:viewId', function(req, res, err){
    controller.getSharedView(req.params.viewId).then(view => {
      res.status(200).send(view)
    }).catch(err => {
      console.log(err)
      res.status(404).send('View not found')
    })
  })
}