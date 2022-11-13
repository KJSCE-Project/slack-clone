const mongoose = require("mongoose");

const workspaceSchema = require("./Workspace.model");

const channelSchema = new mongoose.Schema({
  cid: {
    type: String,
    required: "This field is required",
  },
  wid: [{ type: mongoose.Schema.Types.ObjectId, ref: "workspaceSchema" }],
  cname: {
    type: String,
    required: "This field is required",
  },
  cdesc: {
    type: String,
    required: "This field is required",
  }
},
{ timestamps: true });

module.exports = mongoose.model("Channel", channelSchema);
