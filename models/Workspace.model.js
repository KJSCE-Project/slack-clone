const mongoose = require("mongoose");
const userSchema = require("./user.model");

const workspaceSchema = new mongoose.Schema({
  wid: {
    type: String,
    required: "This field is required",
  },
  wname: {
    type: String,
    required: "This field is required",
  },
  desc: {
    type: String,
    required: "This field is required",
  },
  createdTime: {
    type: Time,
    required: "This field is required",
  },
  createdUser: [{ type: mongoose.Schema.Types.uid, ref: "userSchema" }],
});
