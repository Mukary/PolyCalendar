const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CalendarSchema = new Schema({
  title: {type: String, required: true},
  color: {type: String, default: 'yellow'},
  events: [{type: Schema.Types.ObjectId, ref: 'Event'}]
})

module.exports = mongoose.model('Calendar', CalendarSchema)