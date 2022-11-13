const mongoose = require("mongoose");

const useChannelSchema = new mongoose.Schema({
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
});

mongoose.model("UseChannel", useChannelSchema);
