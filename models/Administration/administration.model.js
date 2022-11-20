import { Schema, model } from "mongoose";

const administrationSchema = new Schema({
  uid: {
    type: String,
    required: "This field is required",
  },
  wid: {
    type: String,
    required: "This field is required",
  },
  adminTime: {
    type : Date,
    default: Date.now,
  },
},
{ timestamps: true });

export default model("Administration", administrationSchema);
