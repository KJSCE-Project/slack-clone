const mongoose = require("mongoose");

const useWorkspaceSchema = new mongoose.Schema({
  wid: {
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

module.exports = mongoose.model("UseWorkspace", useWorkspaceSchema);
