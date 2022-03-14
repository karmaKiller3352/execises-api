const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.ObjectId,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  date: { 
    type: Date, 
    default: new Date(),
  },
}, { versionKey: false })

const Exercise = mongoose.model("Exercise", exerciseSchema) 

module.exports = Exercise