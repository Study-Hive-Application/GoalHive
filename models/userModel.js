const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: 300,
    },
    subjects: {
      type: String,
    },
    skills: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("USER", userSchema);
