const mongoose = require("mongoose");

const workspaceSchema = require("./Workspace.model");

const channelSchema = new mongoose.Schema({
  cid: {
    type: String,
    required: "This field is required",
  },
  wid: [{ type: mongoose.Schema.Types.uid, ref: "workspaceSchema" }],
  cname: {
    type: String,
    required: "This field is required",
  },
  cdesc: {
    type: String,
    required: "This field is required",
  },
  ccreateTime: {
    type: String,
    required: "This field is required",
  },
});

mongoose.model("Channel", channelSchema);
