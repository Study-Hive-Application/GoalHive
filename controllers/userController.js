const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const USER = require("../models/userModel");

//@desc Dashboard
//@route Get /dashboard
//@access Private
const dashboard = asyncHandler(async (req, res) => {
  const token = req.cookies.Token;
  const decode = jwt.decode(token);
  const user = await USER.findOne({ email: decode.user.email });
  res.render("dashboard", { name: user.name });
});

//@desc To-Do List
//@route Get /to-do-list
//@access Private
const toDoList = asyncHandler(async (req, res) => {
  res.render("todo");
});

//@desc Pomodoro Timer
//@route Get /pomodoro
//@access Private
const pomodoro = asyncHandler(async (req, res) => {
  res.render("pomodoro");
});

// @desc    Update user profile
// @route   PUT /api/users/update
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { name, email, phoneNumber, bio, subjects, skills } = req.body;

  const formattedSubjects = Array.isArray(subjects)
    ? subjects
    : subjects.split(",").map((subject) => subject.trim());

  const updatedUser = await USER.findByIdAndUpdate(
    userId,
    { name, email, phoneNumber, bio, subjects: formattedSubjects, skills },
    { new: true, runValidators: true }
  );

  if (updatedUser) {
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        bio: updatedUser.bio,
        subjects: updatedUser.getFormattedSubjects(),
        skills: updatedUser.skills,
      },
    });
  } else {
    res.status(404).json({ success: false, message: "User not found" });
  }
});

module.exports = { dashboard, toDoList, pomodoro, updateUserProfile };
