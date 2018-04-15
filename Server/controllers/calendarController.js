const mongoose = require('mongoose')
const Calendar = require('../models/Calendar')
const View = require('../models/View')
const Event = require('../models/Event')
const calendarController = {}

calendarController.create = (calendar, events) => {
  return new Promise((resolve, reject) => {
    let newCalendar = new Calendar({
      title: calendar.title,
      color: calendar.color,
      events: []
    })
    newCalendar.save((err, cal) => {
      if(err) reject(err)
      else {
        for(let event in events){
          let newEvent = new Event({
            summary: events[event].summary,
            start: events[event].start,
            end: events[event].end
          })
          newEvent.save((err, e) => {
            if(err) reject(err)
            else calendarController.addEventToCalendar(cal._id, e)
          })
        }
      }
      resolve(cal)
    })
  })
}

calendarController.addEventToCalendar = (calId, event) => {
  return new Promise((resolve, reject) => {
    Calendar.findOneAndUpdate({_id: calId}, {$push: {events: event}}, {new: true}, function(err, res){
      if(err) reject(err)
    })
  })
}

calendarController.getCalendars = () => {
  return new Promise((resolve, reject) => {
    Calendar.find().populate('events').then(calendars => {
      resolve(calendars)
    }).catch(err => {
      reject(err)
    })
  })
}

calendarController.getCalendar = (calId) => {
  return new Promise((resolve, reject) => {
    Calendar.findOne({_id: calId}).populate('events').then(calendar => {
      resolve(calendar)
    }).catch(err => {
      reject(err)
    })
  })
}

calendarController.deleteCalendar = (calId) => {
  return new Promise((resolve, reject) => {
    Calendar.remove({_id: calId}).then(x => {
      View.find({'calendars.cal': calId}).then(views => {
        views.map(view => {
          View.update({_id: view._id}, {$pull: {calendars: {cal: calId}}}).exec()
        })
        resolve(x)
      }).catch(err => {
        reject(err)
      })
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = calendarController