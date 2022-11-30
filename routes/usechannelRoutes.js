import express from "express"
var router = express.Router()
import { body, validationResult } from "express-validator"
import { ChannelService } from "../controllers/channelController.js";
import { MessageService } from "../controllers/messageController.js";
import { UseChannelService } from "../controllers/usechannelController.js";

router.post('/', 
    body("cid").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid cid." }),
    body("uid").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid uid." }),
    body("uname").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid uname." }),
    body("url").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid url." }),
    async (req, res)=>{
        const validationErrors = validationResult(req)
        if (!validationErrors.isEmpty()) {
            res.status(400).send(validationErrors.array()[0].msg)
            return
        }
        
        try {
            let useChannelService = new UseChannelService();
            // Check if user id is null, if yes then insert new record
                let result = await useChannelService.insertRecord(req);
                console.log(result)
                if(result){
                    res.status(201).send(result);
                    return;
                }else{
                    res.status(400).send({
                        "statusCode": 400,
                        "message": "Could not insert data for usechannel"
                    })
                }
        }
        catch (error) {
            console.log(error)
            res.status(500).send({
                code: "server/internal-error",
                message: "An internal server error has occured"
            });
        }
});
router.get("/:cid", async (req, res) => {
    const cid = req.params.cid;
    const usechannelService = new UseChannelService();
    try {
        let result = await usechannelService.getById(cid);
        if (result === null) {
            res.status(404).send({
                code: "data/not-found",
                message: "useChannel not found"
            });
            return;
        }
        res.send(result);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            code: "server/internal-error",
            message: "An internal server has occured"
        });
    }
});
router.get("/:cid/users", async (req, res) => {
    const cid = req.params.cid;
    const usechannelService = new UseChannelService();
    try {
        let result = await usechannelService.getAllUsers(cid);
        if (result === null) {
            res.status(404).send({
                code: "data/not-found",
                message: "Users for channel not found"
            });
            return;
        }
        res.send(result);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            code: "server/internal-error",
            message: "An internal server has occured"
        });
    }
});
export default router;