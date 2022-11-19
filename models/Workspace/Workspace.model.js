import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const workspaceSchema = new _Schema({
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

export default model("Workspace", workspaceSchema);