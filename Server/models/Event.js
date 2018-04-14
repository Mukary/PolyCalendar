const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
  summary: {type: String, required: true},
  start: {type: Date},
  end: {type: Date}
})

module.exports = mongoose.model('Event', EventSchema)