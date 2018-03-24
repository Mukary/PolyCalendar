
require('./User')
const mongoose = require('mongoose')
const users = mongoose.model('User')
module.exports = {users: users}
