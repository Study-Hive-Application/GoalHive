const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const connectDB = asyncHandler(async () => {
  const connect = await mongoose.connect(process.env.MONGO_URI);
  console.log(
    "Connected to MongoDB host : ",
    connect.connection.host,
    "\tname : ",
    connect.connection.name
  );
});

module.exports = connectDB;
