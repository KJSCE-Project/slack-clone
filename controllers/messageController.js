import mongoose from "mongoose";
const Message = mongoose.model("Messages");
import { v4 as uuid } from "uuid";

export class MessageService {
  async insertRecord(req) {
    var message = new Message();
    const mid = uuid();
    message.mid = mid;
    message.cid = req.body.cid;
    message.uid = req.body.uid;
    message.content = req.body.content;
    message.mtype = req.body.mtype;
    message.url = req.body.url;

    try {
      const result = await message.save();
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getById(mid) {
    try {
      const result = await Message.findOne({ mid: mid });
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async getByChannelId(cid) {
    try {
      const result = await Message.find({cid:cid}).sort({createdAt: -1});
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
