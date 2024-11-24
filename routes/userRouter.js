const express = require("express");
const {
  dashboardType,
  toDoList,
  pomodoro,
  profileType,
  updateProfile,
} = require("../controllers/userController");
const Router = express.Router();

//Dashboard Routes
Router.route("/dashboard").get(dashboardType);

//Profile Routes
Router.route("/profile").get(profileType).put(updateProfile);

//TO-DO LIST Routes
Router.route("/to-do-list").get(toDoList);

//Pomodoro Routes
Router.route("/pomodoro").get(pomodoro);

module.exports = Router;
