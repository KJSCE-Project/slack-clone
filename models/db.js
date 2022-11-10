const mongoose = require("mongoose");

const mongoAtlasUri = "mongodb+srv://user:user@slack.pvod0bs.mongodb.net/slack";
try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Mongoose is connected")
  );
} catch (e) {
  console.log("Could not connect");
}

require('./user.model');