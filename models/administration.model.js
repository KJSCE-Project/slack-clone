const mongoose = require("mongoose");

const administrationSchema = new mongoose.Schema({
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
});

mongoose.model("Administration", administrationSchema);
