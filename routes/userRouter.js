const express = require("express");
const {
  dashboard,
  toDoList,
  pomodoro,
} = require("../controllers/userController");
const Router = express.Router();

//Dashboard Routes
Router.route("/dashboard").get(dashboard);

//TO-DO LIST Routes
Router.route("/to-do-list").get(toDoList);

//Pomodoro Routes
Router.route("/pomodoro").get(pomodoro);

module.exports = Router;
