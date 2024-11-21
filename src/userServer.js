const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const dotenv = require("dotenv").config();
const accessRouter = require("../routes/accessRouter.js");
const connectDB = require("../config/dbConnection.js");
const cookieParser = require("cookie-parser");
const userRouter = require("../routes/userRouter.js");
const accessMiddleware = require("../middleware/accessAuth.js");

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

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
app.use("/", accessMiddleware, accessRouter); //Signup and Login Routes
app.use("/", accessMiddleware, userRouter); //Authorized User Routes

//Port  Listening
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//Socket Connections
io.on("connection", (socket) => {
  console.log("User connected : ", socket.id);

  socket.on("sender-text", (message) => {
    socket.broadcast.emit("re-message", message);
  });
});
