const express = require("express");
const {
  dashboard,
  toDoList,
  pomodoro,
<<<<<<< HEAD
  chat,
  profile,
  updateProfile,
=======
  updateUserProfile,
>>>>>>> f50ffe25c1b363fb82ec6e6227f851ab489dbc0a
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

<<<<<<< HEAD
//Chat Routes
Router.route("/chat").get(chat);
=======
//UpdateUser Routes
const { protect } = require("../middleware/userAuth");
Router.put("/update", protect, updateUserProfile);
>>>>>>> f50ffe25c1b363fb82ec6e6227f851ab489dbc0a

module.exports = Router;
