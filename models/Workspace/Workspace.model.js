import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const workspaceSchema = new _Schema({
  wid: {
    type: String,
    required: "This field is required",
    unique: true
  },
  wname: {
    type: String,
    required: "This field is required",
  },
  desc: {
    type: String,
    required: "This field is required",
  },
  uid: [{ type: String, ref: "userSchema" }],
},
{ timestamps: true });

export default model("Workspace", workspaceSchema);