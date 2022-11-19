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
    type: String,
    required: "This field is required",
  },
},
{ timestamps: true });

export default model("Administration", administrationSchema);
