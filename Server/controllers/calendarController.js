const mongoose = require('mongoose')
const Calendar = require('../models/Calendar')
const View = require('../models/View')
const Event = require('../models/Event')
const calendarController = {}

calendarController.create = (calendar, events, owner) => {
  return new Promise((resolve, reject) => {
    let newCalendar = new Calendar({
      title: calendar.title,
      url: calendar.url,
      owner: owner,
      fileContent: calendar.fileContent,
      isFile: calendar.isFile,
      events: []
    })
    newCalendar.save((err, cal) => {
      if(err) {
        let error = new Error()
        error.status = 500
        error.message = 'Error when saving calendar'
        reject(error)
      }
      else {
        for(let event in events){
          let newEvent = new Event({
            summary: events[event].summary,
            start: events[event].start,
            end: events[event].end,
            description: events[event].description
          })
          newEvent.save((err, e) => {
            if(err) {
              let error = new Error()
              error.status = 500
              error.message = 'Error when saving calendar'
              reject(error)
            }
            else calendarController.addEventToCalendar(cal._id, e)
          })
        }
      }
      resolve(cal)
    })
  })
}

calendarController.download = (calId) => {
  return new Promise((resolve, reject) => {
    Calendar.findOne({_id: calId, isFile:true}).then(calendar => {
      resolve(calendar.fileContent)
    }).catch(err => {
      let error = new Error()
      error.status = 500
      error.message = 'Error with database when getting calendar'
      reject(error)
    })
  })
}

calendarController.addEventToCalendar = (calId, event) => {
  return new Promise((resolve, reject) => {
    Calendar.findOneAndUpdate({_id: calId}, {$push: {events: event}}, {new: true}, function(err, res){
      if(err) {
        let error = new Error()
        error.status = 500
        error.message = 'Error when saving event'
        reject(error)
      }
    })
  })
}

calendarController.getCalendars = (owner) => {
  return new Promise((resolve, reject) => {
    Calendar.find({owner: owner}).populate('events').then(calendars => {
      resolve(calendars)
    }).catch(err => {
      let error = new Error()
      error.status = 500
      error.message = 'Error when getting calendars'
      reject(error)
    })
  })
}

calendarController.getCalendar = (calId, owner) => {
  return new Promise((resolve, reject) => {
    Calendar.findOne({_id: calId, owner: owner}).populate('events').then(calendar => {
      if(calendar) resolve(calendar)
      else {
        let error = new Error()
        error.status = 404
        error.message = 'Calendar not found'
        reject(error)
      }
    }).catch(err => {
      let error = new Error()
      error.status = 500
      error.message = 'Error when getting calendar'
      reject(error)
    })
  })
}

calendarController.update = (newName, calId, owner) => {
  return new Promise((resolve, reject) => {
    Calendar.findOneAndUpdate({_id: calId, owner: owner}, {$set:{title: newName}}).then(res => {
      Calendar.findOne({_id: calId}).populate('events').then(calendar => {
        resolve(calendar)
      })
    }).catch(err => {
      let error = new Error()
      error.status = 500
      error.message = 'Error when updating calendar'
      reject(error)
    })
  })
}

calendarController.deleteCalendar = (calId, owner) => {
  return new Promise((resolve, reject) => {
    Calendar.remove({_id: calId, owner}).then(x => {
      View.find({'calendars.cal': calId}).then(views => {
        views.map(view => {
          View.update({_id: view._id}, {$pull: {calendars: {cal: calId}}}).exec()
        })
        resolve(x)
      }).catch(err => {
        let error = new Error()
        error.status = 500
        error.message = 'Error when deleting calendar in view'
        reject(error)
      })
    }).catch(err => {
      let error = new Error()
      error.status = 500
      error.message = 'Error when deleting calendar'
      reject(error)
    })
  })
}

module.exports = calendarController