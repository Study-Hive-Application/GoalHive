const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },

    reminderTime: {
      type: Date,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
