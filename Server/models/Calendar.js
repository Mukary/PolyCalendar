const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CalendarSchema = new Schema({
  title: {type: String, required: true},
  color: {type: String, default: 'yellow'},
  events: [{type: String, default: 'E'}]
})

module.exports = mongoose.model('Calendar', CalendarSchema)