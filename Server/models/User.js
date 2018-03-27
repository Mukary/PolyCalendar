const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  accessToken: {type: String, default: ''},
  accountCreation: {type: Date, default: new Date()},
  lastConnection: {type: Date, default: new Date()} 
})

module.exports = mongoose.model('User', UserSchema)