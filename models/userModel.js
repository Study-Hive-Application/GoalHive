const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default:
        "https://imgs.search.brave.com/Ga2ppHjURvGKdmnHrE7AsiXEcLH4Ua8E_SaaiUREmWA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjY5/Njg4MjI4L3ZlY3Rv/ci9hZ2VudC1pY29u/LXNweS1zdW5nbGFz/c2VzLWhhdC1hbmQt/Z2xhc3Nlcy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9M0Uz/VjdCcS1nc2o1TjdM/Qzd0MlRVdC1uOEpP/QnJVN0N5SGNlWEV3/bnl6UT0",
    },
    phoneNumber: {
      type: String,
      default: "Add Number",
    },
    bio: {
      type: String,
      default: "Add Bio",
    },
    skills: {
      type: Array,
      default: ["No Skills Added"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("USER", userSchema);
