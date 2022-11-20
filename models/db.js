import { connect } from "mongoose";

const mongoAtlasUri = "mongodb+srv://user:user@slack.pvod0bs.mongodb.net/slack";
try {
  // Connect to the MongoDB cluster
  connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Mongoose is connected")
  );
} catch (e) {
  console.log("Could not connect");
}

import './User/user.model.js';
import './Administration/administration.model.js';
import './Channel/channel.model.js';
import './Invitation/invitation.model.js';
import './Message/messages.model.js';
import './UseChannel/useChannel.model.js';
import './UseWorkspace/useWorkspace.model.js';
import './Workspace/Workspace.model.js';