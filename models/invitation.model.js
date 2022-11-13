const mongoose = require("mongoose");
const userSchema = require("./user.model");

const invitationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: "This field is required",
  },
  from: [{ type: mongoose.Schema.Types.ObjectId, ref: "userSchema" }],
  to: [{ type: mongoose.Schema.Types.ObjectId, ref: "userSchema" }],
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

module.exports = mongoose.model("Invitation", invitationSchema);
