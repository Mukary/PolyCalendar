const router = require('express').Router()
const controllers = require('../controllers')
const models = require('../models')

require('./User')(router, controllers.userController)

module.exports = router