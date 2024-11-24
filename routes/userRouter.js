const express = require("express");
const {
  dashboardType,
  toDoList,
  pomodoro,
  profileType,
  updateProfile,
  taskType,
  studyScheduleType,
} = require("../controllers/userController");
const Router = express.Router();

//Dashboard Routes
Router.route("/dashboard").get(dashboardType);

//Profile Routes
Router.route("/profile").get(profileType).put(updateProfile);

//TO-DO LIST Routes
Router.route("/todo")
  .get(taskType)
  .post(taskType)
  .put(taskType)
  .delete(taskType);

//Pomodoro Routes
Router.route("/pomodoro").get(pomodoro);

//Study Schedule Routes
Router.route("/schedule")
  .get(studyScheduleType)
  .post(studyScheduleType)
  .delete(studyScheduleType);

module.exports = Router;
