const mongoose = require("mongoose");

const useChannelSchema = new mongoose.Schema(
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
      type: String,
      required: "This field is required",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UseChannel", useChannelSchema);
