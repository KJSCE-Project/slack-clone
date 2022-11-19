import { Schema, model } from "mongoose";

import workspaceSchema from "../Workspace/Workspace.model.js";

const channelSchema = new Schema({
  cid: {
    type: String,
    required: "This field is required",
  },
  wid: [{ type: Schema.Types.ObjectId, ref: "workspaceSchema" }],
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

export default model("Channel", channelSchema);
