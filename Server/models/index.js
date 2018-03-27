
require('./User')
require('./Invite')
const mongoose = require('mongoose')

const users = mongoose.model('User')
const invites = mongoose.model('Invite')

module.exports = {users: users, invites: invites}
