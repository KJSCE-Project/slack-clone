import mongoose from 'mongoose'
const UseWorkspace = mongoose.model("UseWorkspace")

export class UseWorkspaceService{    
    async upsertRecord(req){
        try {
            const result = await UseWorkspace.findOneAndUpdate({wid: req.body.wid, uid: req.body.uid}, req.body, {upsert: true});
            return result?result : this.getById(req.body.uid);
          } catch (err) {
            console.error(err);
            return null;
          }
    }

    async getById(uid){
        try {
            const result = await UseWorkspace.findOne({uid: uid});
            return result;
          } catch (err) {
            console.error(err);
            return null;
          } 
    }
}