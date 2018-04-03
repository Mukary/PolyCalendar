const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CalendarSchema = new Schema({
  title: {type: String, required: true},
  color: {type: String, default: 'yellow'}
})

module.exports = mongoose.model('Calendar', CalendarSchema)