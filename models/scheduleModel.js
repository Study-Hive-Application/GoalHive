const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  subjects: {
    type: Array,
    default: [],
  },
});

const StudySchedule = mongoose.model("StudySchedule", scheduleSchema);
module.exports = StudySchedule;
