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
    phoneNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    bio: {
      type: String,
      maxlength: 300,
    },
    subjects: {
      type: [String],
      validate: {
        validator: function (subjects) {
          return Array.isArray(subjects) && subjects.length > 0;
        },
        message: "Subjects should be a non-empty array of strings",
      },
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getFormattedSubjects = function () {
  return this.subjects.join(", ");
};

module.exports = mongoose.model("USER", userSchema);
