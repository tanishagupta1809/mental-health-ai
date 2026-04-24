const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    sleep_hours: {
      type: Number,
      min: 0,
      max: 24,
      required: true
    },
    stress_level: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    },
    anxiety_score: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    },
    depression_score: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    },
    risk_level: {
      type: String,
      enum: ["Low", "Moderate", "High"],
      required: true
    },
    notes: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assessment", assessmentSchema);
