const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const USER = require("../models/userModel");

//@desc Dashboard
//@route Get /dashboard
//@access Private
const dashboard = (req, res) => {
  res.render("dashboard");
};

//@desc Dashboard
//@route Get /dashboard
//@access Private
const loadDashboard = asyncHandler(async (req, res) => {
  const token = req.cookies.Token;
  const decode = jwt.decode(token);
  const user = await USER.findOne({ userId: decode.user.userId }); //Search in Database
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    profileImage: user.profileImage,
    name: user.name,
    phone: user.phoneNumber,
    bio: user.bio,
    skills: user.skills,
    subjects: user.subjects,
  });
});

const dashboardType = (req, res) => {
  const { type } = req.query;

  if (type === "load") {
    return loadDashboard(req, res);
  }
  return dashboard(req, res);
};

// @desc Get Profile Page
// @route GET /profile
// @access Private
const profile = (req, res) => {
  res.render("profile");
};

// @desc Get Profile Data
// @route GET /profile
// @access Private
const getProfileData = asyncHandler(async (req, res) => {
  const token = req.cookies.Token;
  const decode = jwt.decode(token);
  const user = await USER.findOne({ userId: decode.user.userId }); //Search in Database
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    profileImage: user.profileImage,
    name: user.name,
    phone: user.phoneNumber,
    bio: user.bio,
    skills: user.skills,
    subjects: user.subjects,
  });
});

// @desc Update user profile
// @route PUT /api/users/update
// @access Private
const updateProfile = asyncHandler(async (req, res) => {
  const token = req.cookies.Token;
  const decode = jwt.decode(token);
  const user = await USER.findOne({ userId: decode.user.userId });
  const { name, email, bio, skills, subjects, profileImage, phoneNumber } =
    req.body;
  const updatedUser = await USER.findByIdAndUpdate(
    user._id,
    { name, email, bio, skills, subjects, profileImage, phoneNumber },
    { new: true }
  );
  if (updatedUser) {
    res.status(200).json({ message: "Profile updated successfully" });
  } else {
    res.status(400).json({ message: "Failed to update profile" });
  }
});

const profileType = (req, res) => {
  const { type } = req.query;
  if (type === "load") {
    return getProfileData(req, res);
  }
  return profile(req, res);
};

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
  dashboardType,
  toDoList,
  pomodoro,
  profileType,
  updateProfile,
};
