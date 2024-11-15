const {
  getSignupPage,
  getLoginPage,
  createUser,
  loginUser,
  homePage,
  getFeaturesPage,
  getAboutUsPage,
  getContactUsPage,
} = require("../controllers/accessController");
const express = require("express");
const Router = express.Router();

//HOME PAGE
Router.route("/").get(homePage);

//SIGNUP
Router.route("/signup").get(getSignupPage).post(createUser);

//LOGIN
Router.route("/login").get(getLoginPage).post(loginUser);

//Features
Router.route("/features").get(getFeaturesPage);

//ABOUT US
Router.route("/about").get(getAboutUsPage);

//CONTACT US
Router.route("/contact").get(getContactUsPage);

module.exports = Router;
