import mongoose from "mongoose";
const Administration = mongoose.model("Administration");

export class AdministrationService {
  async insertRecord(req) {
    var administration = new Administration();
    administration.uid = req.body.uid;
    administration.wid = req.body.wid;
    administration.adminTime = req.body.adminTime;

    try {
      const result = await administration.save();
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getById(wid) {
    try {
      const result = await Administration.findOne({ wid: wid });
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
