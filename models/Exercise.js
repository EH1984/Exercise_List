const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
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

module.exports = Exercise = mongoose.model("exercise", exerciseSchema);
