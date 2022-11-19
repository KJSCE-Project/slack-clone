import { Schema, model } from "mongoose";
import userSchema from "../User/user.model.js";

const messagesSchema = new Schema({
  mid: {
    type: String,
    required: "This field is required",
  },
  cid: [{ type: Schema.Types.ObjectId, ref: "userSchema" }],
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
  }
},
{ timestamps: true });

export default model("Messages", messagesSchema);
