const express = require("express");
const {
  dashboard,
  toDoList,
  pomodoro,
  chat,
  profile,
  updateProfile,
} = require("../controllers/userController");
const Router = express.Router();

//Dashboard Routes
Router.route("/dashboard").get(dashboard);

//Profile Routes
Router.route("/profile").get(profile).put(updateProfile);

//TO-DO LIST Routes
Router.route("/to-do-list").get(toDoList);

//Pomodoro Routes
Router.route("/pomodoro").get(pomodoro);

//Chat Routes
Router.route("/chat").get(chat);

module.exports = Router;
