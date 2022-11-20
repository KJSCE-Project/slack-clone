import mongoose from "mongoose";
const Channel = mongoose.model("Channel");
import { v4 as uuid } from "uuid";

export class ChannelService {
  async insertRecord(req) {
    var channel = new Channel();
    const cid = uuid();
    channel.cid = cid;
    channel.wid = req.body.wid;
    channel.cname = req.body.cname;
    channel.cdesc = req.body.cdesc;

    try {
      const result = await channel.save();
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getById(cid) {
    try {
      const result = await Channel.findOne({ cid: cid });
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
