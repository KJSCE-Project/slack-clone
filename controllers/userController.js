import mongoose from 'mongoose'
const User = mongoose.model("User")
import {v4 as uuid} from 'uuid';

export class UserService{
    async insertRecord(req){
        var user = new User();
        const id = uuid();
        user.uid = id;
        user.username = req.body.username;
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.profile = req.body.profile;
        user.login_type = req.body.login_type;
        user.user_type = req.body.user_type;
        user.role = req.body.role;

        try {
            const result = await user.save();
            return result;
          } catch (err) {
            console.error(err);
            return null;
          }
    }
    
    async updateRecord(req){
        try {
            const result = await User.findOneAndUpdate({id: req.body.id}, req.body, {new: true});
            return result;
          } catch (err) {
            console.error(err);
            return null;
          }
    }

    async getById(uid){
        try {
            const result = await User.findOne({uid: uid});
            return result;
          } catch (err) {
            console.error(err);
            return null;
          } 
    }
}