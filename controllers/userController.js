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
  res.render("dashboard", { name: user.name, profileImage: user.profileImage });
});

//@desc Dashboard Edit
//@route Get /edit
//@access Private
const edit = asyncHandler(async (req, res) => {
  const token = req.cookies.Token;
  const decode = jwt.decode(token);
  const user = await USER.findOne({ email: decode.user.email });
  res.render("dashboard", { name: user.name, profileImage: user.profileImage });
});

//@desc To-Do List
//@route Get /to-do-list
//@access Private
const toDoList = asyncHandler(async (req, res) => {
  res.render("todo", { isAuthenticated: req.isAuthenticated });
});

//@desc Pomodoro Timer
//@route Get /pomodoro
//@access Private
const pomodoro = asyncHandler(async (req, res) => {
  res.render("pomodoro", { isAuthenticated: req.isAuthenticated });
});

//@desc Chat
//@route Get /chat
//@access Private
const allChat = (req, res) => {
  res.render("chat");
};

module.exports = { dashboard, toDoList, pomodoro, allChat };
