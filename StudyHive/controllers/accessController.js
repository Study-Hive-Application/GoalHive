const USER = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { jwtAndCookies } = require("./commonFunctions");

//@desc Home Page
//@route Get /
//@access Public
const homePage = (req, res) => {
  res.render("index");
};

//@desc Signup Page
//@route POST /user/signup
//@access Public
const getSignupPage = (req, res) => {
  res.render("signup", { errorMessage: null });
};

//@desc Create User
//@route POST /user/signup
//@access Public
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check is Email Already Created
  const checkEmail = await USER.findOne({ email });
  if (checkEmail) {
    return res.render("signup", { errorMessage: "Email Already Exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10); // Hashing Password
  const userDetails = {
    name,
    email,
    password: hashedPassword,
  };
  const newUser = await USER.create(userDetails); // Storing Details in DB

  // Creating a Jwt Token and Cookie
  jwtAndCookies(res, newUser._id, newUser.name, newUser.email);
});

//@desc Login Page
//@route GET /login
//@access Public
const getLoginPage = async (req, res) => {
  res.render("login", { errorMessage: null });
};

//@desc Check Login Details
//@route POST /login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Check if Email Does Not Exist
  const user = await USER.findOne({ email });
  if (!user) {
    return res.render("login", {
      errorMessage: "Email Not Found. Signup Now!!!",
    });
  }
  //Check if Password Matches
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.render("login", { errorMessage: "Incorrect Password" });
  }
  // Creating a Jwt Token and Cookie
  jwtAndCookies(res, user._id, user.name, user.email);
});

module.exports = {
  getSignupPage,
  getLoginPage,
  createUser,
  loginUser,
  homePage,
};
