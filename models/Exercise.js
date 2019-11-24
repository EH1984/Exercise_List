const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema(
  {
    index: {
      type: Number
    },
    description: {
      type: String,
      required: true
    },
    duration: {
      type: Number
    },
    intensity: {
      type: Number
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = Exercise = mongoose.model('exercise', exerciseSchema);
