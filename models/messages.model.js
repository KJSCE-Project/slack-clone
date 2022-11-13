const mongoose = require("mongoose");
const userSchema = require("./user.model");

const messagesSchema = new mongoose.Schema({
  mid: {
    type: String,
    required: "This field is required",
  },
  cid: [{ type: mongoose.Schema.Types.uid, ref: "userSchema" }],
  uid: {
    type: String,
    required: "This field is required",
  },
  content: {
    type: String,
    required: "This field is required",
  },
  mtype: {
    type: String,
    enum: ["text", "image"],
    required: "This field is required",
  },
  url: {
    type: String,
  },
  createdTime: {
    type: Time,
    required: "This field is required",
  },
});

mongoose.model("UseChannel", useChannelSchema);
