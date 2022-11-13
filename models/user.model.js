const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: "This field is required",
  },
  username: {
    type: String,
    required: "This field is required",
  },
  first_name: {
    type: String,
    required: "This field is required",
  },
  last_name: {
    type: String,
    required: "This field is required",
  },
  email: {
    type: String,
    required: "This field is required",
  },
  password: {
    type: String,
    required: "This field is required",
  },
  profile: {
    type: String,
    required: "This field is required",
  },
  login_type: {
    type: Boolean,
    required: "This field is required",
  },
  user_type: {
    type: String,
    enum: ["employee", "admin"],
    required: "This field is required",
  },
  role: {
    type: String,
    enum: [
      "frontend",
      "backend",
      "designer",
      "tester",
      "human resource",
      "marketing",
      "manager",
      "director",
    ],
    required: "This field is required",
  },
},
{ timestamps: true });

module.exports = mongoose.model("User", userSchema);
