import mongoose from 'mongoose'
const Workspace = mongoose.model("Workspace")
import {v4 as uuid} from 'uuid';

export class WorkspaceService{
    async insertRecord(req){
        var workspace = new Workspace();
        const id = uuid();
        workspace.wid = id;
        workspace.wname = req.body.wname;
        workspace.desc = req.body.desc;
        workspace.uid = req.body.uid;
        try {
            const result = await workspace.save();
            return result;
          } catch (err) {
            console.error(err);
            return null;
          }
    }
    
    async updateRecord(req){
        try {
            const result = await Workspace.findOneAndUpdate({wid: req.body.wid}, req.body, {new: true});
            return result;
          } catch (err) {
            console.error(err);
            return null;
          }
    }

    async getById(wid){
        try {
            const result = await Workspace.findOne({wid: wid});
            return result;
          } catch (err) {
            console.error(err);
            return null;
          } 
    }
    async getAllByUserId(uid){
      try {
          const result = await Workspace.find({uid: uid});
          return result;
        } catch (err) {
          console.error(err);
          return null;
        } 
  }
}