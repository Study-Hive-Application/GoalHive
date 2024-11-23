const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const accessRouter = require("../routes/accessRouter.js");
const connectDB = require("../config/dbConnection.js");
const cookieParser = require("cookie-parser");
const userRouter = require("../routes/userRouter.js");
const accessMiddleware = require("../middleware/accessAuth.js");

const port = process.env.PORT || 3000;
const app = express();

//Connecting Database
connectDB();

//Default Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//Setting View Engine For EJS Rendering - HTML Pages
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

//Static Folder
app.use(express.static(path.resolve(__dirname, "../public")));

//Routes
app.use("/", accessRouter); //Unauthorized User Routes
app.use("/", accessMiddleware, userRouter); //Authorized User Routes

//Port  Listening
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
