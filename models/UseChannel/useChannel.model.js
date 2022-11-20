import { Schema, model } from "mongoose";

const useChannelSchema = new Schema(
  {
    cid: {
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
  },
  {
    timestamps: true,
  }
);

export default model("UseChannel", useChannelSchema);
