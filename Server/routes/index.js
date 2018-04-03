const router = require('express').Router()
const controllers = require('../controllers')
const models = require('../models')

require('./User')(router, controllers.userController)
require('./View')(router, controllers.viewController)
require('./Calendar')(router, controllers.calendarController)

module.exports = router