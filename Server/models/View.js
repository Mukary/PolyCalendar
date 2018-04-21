const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ViewSchema = new Schema({
  title: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  calendars: [{
    visible: Boolean,
    cal: {type: Schema.Types.ObjectId, ref: 'Calendar'}
  }]
})

module.exports = mongoose.model('View', ViewSchema)