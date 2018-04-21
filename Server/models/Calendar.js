const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CalendarSchema = new Schema({
  title: {type: String, required: true},
  url: {type: String, default: ''},
  fileContent:{type: String, default: ''},
  owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  isFile: {type: Boolean, default:'false'},
  events: [{type: Schema.Types.ObjectId, ref: 'Event'}]
})

module.exports = mongoose.model('Calendar', CalendarSchema)