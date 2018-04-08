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

viewController.getView = (viewId) => {
  return new Promise((resolve, reject) => {
    View.findOne({_id: viewId}).populate('calendars.cal').exec().then(view => {
      resolve(view)
    }).catch(err => {
      reject(err)
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
          View.findOne({_id:view._id}).populate('calendars.cal').exec().then(pView => {
            resolve(pView)
          }).catch(err => {
            console.log('Error while populating view')
            reject(err)
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
      View.findOne({_id:viewId}).then(view => {
        calendars.map(c => {
          view.calendars.pull({cal: c.cal})
          view.calendars.push({cal: c.cal, visible: c.visible})
        })
        view.save().then(view => {
          View.findOne({_id: view._id}).populate('calendars.cal').exec().then(pView => {
            resolve(pView)
          }).catch(err => {
            console.log('Could not populate view')
            reject(err)
          })
        }).catch(err => {
          console.log('Could not udpate calendars view')
          reject(err)
        })
      }).catch(err => {
        console.log('Could not find view')
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