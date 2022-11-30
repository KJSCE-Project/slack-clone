import mongoose from "mongoose";
const UseChannel = mongoose.model("UseChannel");

export class UseChannelService {
  async insertRecord(req) {
    var useChannel = new UseChannel();
    useChannel.cid = req.body.cid;
    useChannel.uid = req.body.uid;
    useChannel.uname = req.body.uname;
    useChannel.url = req.body.url;
    useChannel.joinTime = req.body.content;

    try {
      const result = await useChannel.save();
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getById(cid) {
    try {
      const result = await UseChannel.findOne({ cid: cid });
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async getAllUsers(cid) {
    try {
      const result = await UseChannel.find({ cid: cid });
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
