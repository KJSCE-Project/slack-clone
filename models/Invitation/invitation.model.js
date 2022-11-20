import { Schema, model } from "mongoose";
import userSchema from "../User/user.model.js";

const invitationSchema = new Schema({
  id: {
    type: String,
    required: "This field is required",
  },
  from: [{ type: String, ref: "userSchema" }],
  to: [{ type: String, ref: "userSchema" }],
  Status: {
    type: Boolean,
    required: "This field is required",
  },
  email: {
    type: String,
    required: "This field is required",
  },
},
{ timestamps: true });

export default model("Invitation", invitationSchema);
