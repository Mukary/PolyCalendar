const mongoose = require('mongoose')
const Calendar = require('../models/Calendar')
const View = require('../models/View')
const calendarController = {}

calendarController.create = (calendar) => {
  return new Promise((resolve, reject) => {
    let newCalendar = new Calendar({
      title: calendar.title,
      color: calendar.color,
      events: ["A", "B", "C"]
    })
    newCalendar.save((err, item) => {
      if(err) reject(err)
      resolve(item)
    })
  })
}

calendarController.getCalendars = () => {
  return new Promise((resolve, reject) => {
    Calendar.find().then(calendars => {
      resolve(calendars)
    }).catch(err => {
      reject(err)
    })
  })
}

calendarController.deleteCalendar = (calId) => {
  return new Promise((resolve, reject) => {
    Calendar.remove({_id: calId}).then(x => {
      resolve(x)
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = calendarController