const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const accessRouter = require("../routes/accessRouter.js");
const connectDB = require("../config/dbConnection.js");
const cookieParser = require("cookie-parser");
const verifiedUserOnly = require("../middleware/userAuth.js");
const userRouter = require("../routes/userRouter.js");
import testConnection from "../config/supabase.js";
const port = process.env.PORT || 3000;
const app = express();

//Connecting Database
testConnection();

//Default Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//Setting View Engine For EJS Rendering - HTML Pages
app.set("view engine", "ejs");
app.set("views", path.resolve("../views"));

//Static Folder
app.use(express.static(path.resolve(__dirname, "../public")));

//Routes
app.use("/", accessRouter); //Signup and Login Routes
app.use("/", verifiedUserOnly, userRouter); //Authorized User Routes

//Port  Listening
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
