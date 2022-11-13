const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  uid: [{ type: Schema.Types.ObjectId, ref: "userSchema" }],
},
{ timestamps: true });

module.exports = mongoose.model("Workspace", workspaceSchema);