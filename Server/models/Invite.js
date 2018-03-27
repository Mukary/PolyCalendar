const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InviteSchema = new Schema({
  email: {type: String, required: true},
  code: {type: String, required: true},
  consumed: {type: Boolean, default: false}
})

module.exports = mongoose.model('Invite', InviteSchema)