const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const USER = require("../models/userModel");

//@desc Dashboard
//@route Get /dashboard
//@access Private
const dashboard = asyncHandler(async (req, res) => {
  const token = req.cookies.Token;
  const decode = jwt.decode(token);
  const user = await USER.findOne({ userId: decode.user.userId });
  res.render("dashboard", { user });
});

// @desc Update user profile
// @route PUT /api/users/update
// @access Private
const editProfile = asyncHandler(async (req, res) => {});

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

module.exports = {
  dashboard,
  toDoList,
  pomodoro,
  editProfile,
};
