
require('./User')
require('./Invite')
require('./View')

const mongoose = require('mongoose')

const users = mongoose.model('User')
const invites = mongoose.model('Invite')
const views = mongoose.model('View')

module.exports = {users: users, invites: invites, views: views}
