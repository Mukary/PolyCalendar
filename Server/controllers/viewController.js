const mongoose = require('mongoose')
const View = require('../models/View')
const Calendar = require('../models/Calendar')
const Event = require('../models/Event')
const icalToolkit = require('ical-toolkit')
const viewController = {}

viewController.create = (view, owner) => {
  return new Promise((resolve, reject) => {
    let newView = new View({
      title: view.title,
      owner: owner,
      calendars: view.calendars
    })
    newView.save((err, item) => {
      if(err) {
        reject(err)
      }
      resolve(item)
    })
  })
}

viewController.getViews = (owner) => {
  return new Promise((resolve, reject) => {
    View.find({owner: owner}).then(views => {
      resolve(views)
    }).catch(err => {
      reject(err)
    })
  })
}

viewController.getView = (viewId, owner) => {
  return new Promise((resolve, reject) => {
    View.findOne({_id: viewId, owner: owner}).populate('calendars.cal').exec(function(err, res){
      if(err) reject(err)
      Event.populate(res, {path: 'calendars.cal.events'}, function(err, res){
        if(err) {
          reject(err)
        }
        else resolve(res)
      })
    })
  })
}

viewController.exportView = (viewId) => {
  return new Promise((resolve, reject) => {
    View.findOne({_id: viewId}).populate('calendars.cal').exec(function(err, res){
      if(err) reject(err)
      Event.populate(res, {path: 'calendars.cal.events'}, function(err, res){
        if(err) {
          reject(err)
        }
        else {
          let builder = icalToolkit.createIcsFileBuilder()
          builder.spacers = false //Add space in ICS file, better human reading. Default: true
          builder.NEWLINE_CHAR = '\r\n' //Newline char to use.
          builder.throwError = false //If true throws errors, else returns error when you do .toString() to generate the file contents.
          builder.ignoreTZIDMismatch = true

          builder.calname = res.title;
          builder.timezone = 'america/new_york';
          builder.tzid = 'america/new_york';
          builder.method = 'REQUEST';

          res.calendars.forEach(calendar => {
            calendar.cal.events.forEach(e => {
              let eventTransparency = 'OPAQUE' //default value
              if(calendar.visible) eventTransparency = 'TRANSPARENT'
              builder.events.push({
                summary: e['summary'],
                start: new Date(e['start']),
                end: new Date(e['end']),
                description: e['description'],
                transp: eventTransparency
              })
            })
          })
          resolve(builder.toString())
        }
      })
    })
  })
}

viewController.getSharedView = (viewId) => {
  return new Promise((resolve, reject) => {
    View.findOne({_id: viewId}).populate('calendars.cal').exec(function(err, res){
      if(err) {
        reject(err)
      }
      Event.populate(res, {path: 'calendars.cal.events'}, function(err, res){
        if(err) {
          reject(err)
        }
        else resolve(res)
      })
    })
  })
}

viewController.updateView = (viewId, calendars,owner, action) => {
  return new Promise((resolve, reject) => {
    if(action === 'ADD_CALENDARS'){
      View.findOne({_id:viewId, owner}).then(view => {
        calendars.map(c => {
          view.calendars.push({cal:c.cal, visible: c.visible})
        })
        view.save().then(view => {
          View.findOne({_id:view._id}).populate('calendars.cal').exec(function(err, res){
            if(err) {
              reject(err)
            }
            Event.populate(res, {path: 'calendars.cal.events'}, function(err, res){
              if(err) {
                reject(err)
              }
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
      View.update({_id: viewId, 'calendars.cal':calId, owner: owner}, {$set:{
        "calendars.$.visible": visible
      }}).then(view => {
        View.findOne({_id: viewId}).populate('calendars.cal').exec(function(err, res){
          if(err) {
            reject(err)
          }
          Event.populate(res, {path: 'calendars.cal.events'}, function(err, res){
            if(err) {
              reject(err)
            }
            else resolve(res)
          })
        })
      }).catch(err => {
        reject(err)
      })
    }
    if(action === 'REMOVE_CALENDAR'){
      let calId = calendars[0].cal
      View.update({_id: viewId, owner: owner}, {$pull: {calendars: {cal: calId}}}).then(u => {
        View.findOne({_id: viewId}).populate('calendars.cal').exec(function(err, res){
          if(err) {
            reject(err)
          }
          Event.populate(res, {path: 'calendars.cal.events'}, function(err, res){
            if(err) {
              reject(err)
            }
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

viewController.deleteView = (viewId, owner) => {
  return new Promise((resolve, reject) => {
    View.remove({_id: viewId, owner:owner}).then(x => {
      resolve(x)
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = viewController