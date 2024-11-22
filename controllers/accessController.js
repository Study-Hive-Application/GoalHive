const USER = require("../models/userModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const { jwtAndCookies } = require("./commonFunctions");

//@desc Home Page
//@route Get /
//@access Public
const homePage = (req, res) => {
  res.render("index", { isAuthenticated: req.isAuthenticated });
};

//@desc Signup And Login Page
//@route Get /signup and /login
//@access Public
const accountPage = (req, res) => {
  res.render("account");
};

//@desc Signup And Login Page
//@route Get /signup and /login
//@access Public
const signupAccount = asyncHandler(async (req, res) => {
  //const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hashing Password
  const existingUser = await USER.findOne({ email: email }); // Checking If User Already Exists
  if (existingUser) {
    return res.status(400).json({ errorMessage: "Email already exists" });
  }
  const newUser = await USER.create({ name, email, password: hashedPassword }); // Storing Data In Database
  jwtAndCookies(res, newUser.email); // Creating Jwt Token and Cookie
});

//@desc Signup And Login Page
//@route Get /signup and /login
//@access Public
const loginAccount = asyncHandler(async (req, res) => {
  //const { email, password } = req.body;
  const existingUser = await USER.findOne({ email }); //Checking If Email Exists
  if (!existingUser) {
    return res.status(400).json({ errorMessage: "Email does not exist" });
  }

  const correctPassword = await bcrypt.compare(password, user.password); // Compare Passwords
  if (!correctPassword) {
    return res.status(400).json({ errorMessage: "Password is incorrect" });
  }
  jwtAndCookies(res, existingUser.email); // Creating Jwt Token and Cookie
});

//@desc Features
//@route GET /features
//@access Public
const getFeaturesPage = (req, res) => {
  res.render("features", { isAuthenticated: req.isAuthenticated });
};

//@desc About Us Page
//@route GET /aboutus
//@access Public
const getAboutUsPage = (req, res) => {
  res.render("about", { isAuthenticated: req.isAuthenticated });
};

//@desc Contact Us Page
//@route GET /contact-us
//@access Public
const getContactUsPage = (req, res) => {
  res.render("contact", { isAuthenticated: req.isAuthenticated });
};

module.exports = {
  accountPage,
  signupAccount,
  loginAccount,
  homePage,
  getFeaturesPage,
  getAboutUsPage,
  getContactUsPage,
};
