const mongoose = require('mongoose')
const View = require('../models/View')
const Calendar = require('../models/Calendar')
const Event = require('../models/Event')
const viewController = {}

viewController.create = (view) => {
  return new Promise((resolve, reject) => {
    let newView = new View({
      title: view.title,
      color: view.color,
      calendars: view.calendars
    })
    newView.save((err, item) => {
      if(err) reject(err)
      resolve(item)
    })
  })
}

viewController.getViews = () => {
  return new Promise((resolve, reject) => {
    View.find().then(views => {
      resolve(views)
    }).catch(err => {
      reject(err)
    })
  })
}

viewController.getView = (viewId) => {
  return new Promise((resolve, reject) => {
    View.findOne({_id: viewId}).populate('calendars.cal').exec(function(err, res){
      if(err) reject(err)
      Event.populate(res, {path: 'calendars.cal.events'}, function(err, res){
        if(err) reject(err)
        else resolve(res)
      })
    })
  })
}

viewController.updateView = (viewId, calendars, action) => {
  return new Promise((resolve, reject) => {
    if(action === 'ADD_CALENDARS'){
      View.findOne({_id:viewId}).then(view => {
        calendars.map(c => {
          view.calendars.push({cal:c.cal, visible: c.visible})
        })
        view.save().then(view => {
          View.findOne({_id:view._id}).populate('calendars.cal').exec(function(err, res){
            if(err) reject(err)
            Event.populate(res, {path: 'calendars.cal.events'}, function(err, res){
              if(err) reject(err)
              else resolve(res)
            })
          })
        }).catch(err => {
          console.log('Error while updating view')
          reject(err)
        })
      }).catch(err => {
        console.log('Could not find view to update')
        reject(err)
      })
    }
    if(action === 'UPDATE_CALENDAR_MODE'){
      let calId = calendars[0].cal
      let visible = calendars[0].visible
      View.update({_id: viewId, 'calendars.cal':calId}, {$set:{
        "calendars.$.visible": visible
      }}).then(view => {
        View.findOne({_id: viewId}).populate('calendars.cal').exec(function(err, res){
          if(err) reject(err)
          Event.populate(res, {path: 'calendars.cal.events'}, function(err, res){
            if(err) reject(err)
            else resolve(res)
          })
        })
      }).catch(err => {
        reject(err)
      })
    }
    if(action === 'REMOVE_CALENDAR'){
      let calId = calendars[0].cal
      View.update({_id: viewId}, {$pull: {calendars: {cal: calId}}}).then(u => {
        View.findOne({_id: viewId}).populate('calendars.cal').exec(function(err, res){
          if(err) reject(err)
          Event.populate(res, {path: 'calendars.cal.events'}, function(err, res){
            if(err) reject(err)
            else resolve(res)
          })
        })
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    }
  })
}

viewController.deleteView = (viewId) => {
  return new Promise((resolve, reject) => {
    View.remove({_id: viewId}).then(x => {
      resolve(x)
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = viewController