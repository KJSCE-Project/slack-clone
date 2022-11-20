import { Schema, model } from "mongoose";

const useWorkspaceSchema = new Schema({
  wid: {
    type: String,
    required: "This field is required",
  },
  uid: {
    type: String,
    required: "This field is required",
  },
  joinTime: {
    type : Date,
    default: Date.now,
  },
});

export default model("UseWorkspace", useWorkspaceSchema);
