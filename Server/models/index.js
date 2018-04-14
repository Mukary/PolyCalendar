
require('./User')
require('./Invite')
require('./View')
require('./Calendar')
require('./Event')

const mongoose = require('mongoose')

const users = mongoose.model('User')
const invites = mongoose.model('Invite')
const views = mongoose.model('View')
const calendars = mongoose.model('Calendar')
const events = mongoose.model('Event')

module.exports = {users: users, invites: invites, views: views, calendars: calendars, events: events}