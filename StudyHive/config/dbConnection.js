const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "Connected to MongoDB host : ",
      connect.connection.host,
      "\tname : ",
      connect.connection.name
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
