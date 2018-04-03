
require('./User')
require('./Invite')
require('./View')
require('./Calendar')

const mongoose = require('mongoose')

const users = mongoose.model('User')
const invites = mongoose.model('Invite')
const views = mongoose.model('View')
const calendars = mongoose.model('Calendar')

module.exports = {users: users, invites: invites, views: views, calendars: calendars}
