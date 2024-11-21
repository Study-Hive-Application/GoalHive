const express = require("express");
const {
  dashboard,
  toDoList,
  pomodoro,
  updateUserProfile,
} = require("../controllers/userController");
const Router = express.Router();

//Dashboard Routes
Router.route("/dashboard").get(dashboard);

//TO-DO LIST Routes
Router.route("/to-do-list").get(toDoList);

//Pomodoro Routes
Router.route("/pomodoro").get(pomodoro);

//UpdateUser Routes
const { protect } = require("../middleware/userAuth");
Router.put("/update", protect, updateUserProfile);

module.exports = Router;
