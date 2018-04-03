const mongoose = require('mongoose')
const View = require('../models/View')
const Calendar = require('../models/Calendar')
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