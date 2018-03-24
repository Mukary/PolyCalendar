const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, default: ''},
  email: {type: String, default: ''},
  password: {type: String, default: ''},
  token: {type: String, default: ''},
  accountCreation: {type: Date, default: new Date()},
  lastConnection: {type: Date, default: new Date()} 
})

module.exports = mongoose.model('User', UserSchema)