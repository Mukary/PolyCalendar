const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ViewSchema = new Schema({
  title: {type: String, required: true},
  color: {type: String, default: 'yellow'},
  calendars: [{
    visible: Boolean,
    cal: {type: Schema.Types.ObjectId, ref: 'Calendar'}
  }]
})

module.exports = mongoose.model('View', ViewSchema)