const {
  getSignupPage,
  getLoginPage,
  createUser,
  loginUser,
  homePage,
} = require("../controllers/accessController");
const express = require("express");
const Router = express.Router();

//HOME PAGE
Router.route("/home").get(homePage);

//SIGNUP
Router.route("/signup").get(getSignupPage).post(createUser);

//LOGIN
Router.route("/login").get(getLoginPage).post(loginUser);

module.exports = Router;
