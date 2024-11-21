const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema(
  {
    groupOrNot: {
      type: Boolean,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    groupName: {
      type: String,
    },
    groupId: {
      type: String,
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
//module.exports = mongoose.model("Chat", chatSchema);
