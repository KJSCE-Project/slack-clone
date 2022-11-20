import mongoose from "mongoose";
const Invitation = mongoose.model("Invitation");
import { v4 as uuid } from "uuid";

export class InvitationService {
  async insertRecord(req) {
    var invitation = new Invitation();
    const id = uuid();
    invitation.id = id;
    invitation.from = req.body.from;
    invitation.to = req.body.to;
    invitation.Status = req.body.status;
    invitation.email = req.body.email;

    try {
      const result = await invitation.save();
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getById(id) {
    try {
      const result = await Invitation.findOne({ id: id });
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
