const {
  accountPage,
  signupAccount,
  loginAccount,
  homePage,
  getFeaturesPage,
  getAboutUsPage,
  getContactUsPage,
} = require("../controllers/accessController");
const express = require("express");
const Router = express.Router();

//HOME PAGE
Router.route("/").get(homePage);

//SIGNUP AND LOGIN
// Router.route("/account")
//   .get(accountPage)
//   .post(signupAccount)
//   .post(loginAccount);

//Features
Router.route("/features").get(getFeaturesPage);

//ABOUT US
Router.route("/about").get(getAboutUsPage);

//CONTACT US
Router.route("/contact").get(getContactUsPage);

module.exports = Router;
