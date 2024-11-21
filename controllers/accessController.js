const USER = require("../models/userModel");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const asyncHandler = require("express-async-handler");
const { jwtAndCookies } = require("./commonFunctions");

//@desc Home Page
//@route Get /
//@access Public
const homePage = (req, res) => {
  res.render("index", { isAuthenticated: req.isAuthenticated });
};

//@desc Signup Page
//@route POST /user/signup
//@access Public
const getSignupPage = (req, res) => {
  res.render("signup", {
    errorMessage: null,
    isAuthenticated: req.isAuthenticated,
  });
};

//@desc Login Page
//@route GET /login
//@access Public
const getLoginPage = async (req, res) => {
  res.render("login", {
    errorMessage: null,
    isAuthenticated: req.isAuthenticated,
  });
};

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

//@desc Create User
//@route POST /user/signup
//@access Public
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check is Email Already Created
  const checkEmail = await USER.findOne({ email });
  if (checkEmail) {
    return res.render("signup", {
      errorMessage: "Email Already Exists",
      isAuthenticated: req.isAuthenticated,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10); // Hashing Password
  const userDetails = {
    userId: nanoid(10),
    name,
    email,

    password: hashedPassword,
  };
  const newUser = await USER.create(userDetails); // Storing Details in DB

  // Creating a Jwt Token and Cookie
  jwtAndCookies(res, newUser._id, newUser.name, newUser.email);
});

//@desc Check Login Details
//@route POST /login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Check if Email Does Not Exist
  const user = await USER.findOne({ email });
  if (!user) {
    return res.render("login", {
      errorMessage: "Check your Email or Signup Now!!!",
      isAuthenticated: req.isAuthenticated,
    });
  }
  //Check if Password Matches
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.render("login", {
      errorMessage: "Incorrect Password",
      isAuthenticated: req.isAuthenticated,
    });
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
  getFeaturesPage,
  getAboutUsPage,
  getContactUsPage,
};
