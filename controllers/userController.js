const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const USER = require("../models/userModel");
const Todo = require("../models/todoModel");
const StudySchedule = require("../models/scheduleModel");

//@desc Dashboard
//@route Get /dashboard
//@access Private
const dashboard = (req, res) => {
  res.render("dashboard");
};

//@desc Dashboard
//@route Get /dashboard
//@access Private
const loadDashboard = asyncHandler(async (req, res) => {
  const token = req.cookies.Token;
  const decode = jwt.decode(token);
  const user = await USER.findOne({ userId: decode.user.userId }); //Search in Database
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    profileImage: user.profileImage,
    name: user.name,
    phone: user.phoneNumber,
    bio: user.bio,
    skills: user.skills,
    subjects: user.subjects,
  });
});

const dashboardType = (req, res) => {
  const { type } = req.query;

  if (type === "load") {
    return loadDashboard(req, res);
  }
  return dashboard(req, res);
};

// @desc Get Profile Page
// @route GET /profile
// @access Private
const profile = (req, res) => {
  res.render("profile");
};

// @desc Get Profile Data
// @route GET /profile
// @access Private
const getProfileData = asyncHandler(async (req, res) => {
  const token = req.cookies.Token;
  const decode = jwt.decode(token);
  const user = await USER.findOne({ userId: decode.user.userId }); //Search in Database
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    profileImage: user.profileImage,
    name: user.name,
    phone: user.phoneNumber,
    bio: user.bio,
    skills: user.skills,
    subjects: user.subjects,
  });
});

// @desc Update user profile
// @route PUT /api/users/update
// @access Private
const updateProfile = asyncHandler(async (req, res) => {
  const token = req.cookies.Token;
  const decode = jwt.decode(token);
  const user = await USER.findOne({ userId: decode.user.userId });
  const { name, email, bio, skills, subjects, profileImage, phoneNumber } =
    req.body;
  const updatedUser = await USER.findByIdAndUpdate(
    user._id,
    { name, email, bio, skills, subjects, profileImage, phoneNumber },
    { new: true }
  );
  if (updatedUser) {
    res.status(200).json({ message: "Profile updated successfully" });
  } else {
    res.status(400).json({ message: "Failed to update profile" });
  }
});

const profileType = (req, res) => {
  const { type } = req.query;
  if (type === "load") {
    return getProfileData(req, res);
  }
  return profile(req, res);
};

//@desc To-Do List
//@route Get /to-do-list
//@access Private
const toDoList = asyncHandler(async (req, res) => {
  res.render("todo", { isAuthenticated: req.isAuthenticated });
});

//@desc To-Do List
//@route Get /to-do-list
//@access Private
// Fetch Tasks From Database based on Completion Status
const tasksFromDatabase = asyncHandler(async (res, userId, isCompleted) => {
  const tasks = await Todo.find({ userId, isCompleted });

  if (!tasks) {
    return res.status(404).json({ message: "No Tasks Found" });
  }

  // Return tasks without the checkbox for completed ones
  const tasksWithoutCheckbox = tasks.map((task) => ({
    taskName: task.taskName,
    dueDate: task.dueDate,
  }));

  res.status(200).json({ tasks: tasksWithoutCheckbox });
});

// Add Task Function
const addTask = asyncHandler(async (req, res, userId) => {
  const { taskName, dueDate } = req.body;
  const existingTask = await Todo.findOne({ taskName, userId });

  if (existingTask) {
    return res.status(400).json({ message: "Task Name already exists" });
  }

  const newTask = await Todo.create({
    userId,
    taskName,
    dueDate,
  });

  res.status(201).json({ task: newTask });
});

// Mark Task as Completed
const markComplete = asyncHandler(async (req, res, userId) => {
  const { taskName } = req.body;
  const task = await Todo.findOneAndUpdate(
    { userId, taskName },
    { isCompleted: true },
    { new: true }
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({ message: "Task marked as complete", task });
});

// Delete Task Function
const deleteTask = asyncHandler(async (req, res, userId) => {
  const { taskName } = req.body;

  // Find and delete the task
  const task = await Todo.findOneAndDelete({ userId, taskName });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({ message: "Task deleted successfully" });
});

// Handle Task Requests Based on Type
const taskType = asyncHandler(async (req, res) => {
  const { type } = req.query;
  const token = req.cookies.Token;
  const decode = jwt.decode(token);
  const userId = decode.user.userId;

  if (type === "pending") {
    return tasksFromDatabase(res, userId, false);
  } else if (type === "completed") {
    return tasksFromDatabase(res, userId, true);
  } else if (type === "add") {
    return addTask(req, res, userId);
  } else if (type === "markComplete") {
    return markComplete(req, res, userId);
  } else if (type === "delete") {
    return deleteTask(req, res, userId);
  } else {
    return toDoList(req, res);
  }
});

//@desc Pomodoro Timer
//@route Get /pomodoro
//@access Private
const pomodoro = asyncHandler(async (req, res) => {
  res.render("pomodoro", { isAuthenticated: req.isAuthenticated });
});

//@desc Study Schedule
//@route Get /schedule
//@access Private
const studySchedule = asyncHandler(async (req, res) => {
  res.render("schedule", { isAuthenticated: req.isAuthenticated });
});

//@desc Study Schedule
//@route Get /schedule
//@access Private
const loadStudySchedule = asyncHandler(async (req, res, userId) => {
  const schedule = await StudySchedule.find({ userId });

  // Organize schedule by day
  const scheduleData = schedule.reduce((acc, curr) => {
    if (!acc[curr.day]) {
      acc[curr.day] = [];
    }
    acc[curr.day].push(...curr.subjects); // Add the subjects to the corresponding day
    return acc;
  }, {});

  res.json(scheduleData);
});

//@desc Study Schedule
//@route Get /schedule
//@access Private
const addSubject = asyncHandler(async (req, res, userId) => {
  const { day, subject } = req.body;

  const existingSchedule = await StudySchedule.findOne({ userId, day });

  if (existingSchedule) {
    // If schedule exists, add the new subject
    existingSchedule.subjects.push(subject);
    await existingSchedule.save();
  } else {
    // If no schedule exists for that day, create a new one
    const newSchedule = await StudySchedule.create({
      userId,
      day,
      subjects: [subject],
    });
    console.log(newSchedule);
  }
  res.json({ message: "Subject added" });
});

//@desc Study Schedule
//@route Get /schedule
//@access Private
const deleteStudySchedule = asyncHandler(async (req, res, userId) => {
  const { day, subject } = req.body;

  const schedule = await StudySchedule.findOne({ userId, day });

  if (!schedule) {
    return res.status(404).json({ message: "Schedule not found" });
  }

  // Remove the subject from the day's schedule
  const subjectIndex = schedule.subjects.indexOf(subject);
  if (subjectIndex !== -1) {
    schedule.subjects.splice(subjectIndex, 1);
    await schedule.save();
    return res.json({ message: "Subject deleted" });
  } else {
    return res.status(404).json({ message: "Subject not found" });
  }
});

const studyScheduleType = (req, res) => {
  const { type } = req.query;
  const token = req.cookies.Token;
  const decode = jwt.decode(token);
  const userId = decode.user.userId;
  if (type === "load") {
    return loadStudySchedule(req, res, userId);
  } else if (type === "delete") {
    return deleteStudySchedule(req, res, userId);
  } else if (type === "add") {
    return addSubject(req, res, userId);
  } else {
    return studySchedule(req, res);
  }
};

module.exports = {
  dashboardType,
  pomodoro,
  profileType,
  updateProfile,
  taskType,
  studyScheduleType,
};
