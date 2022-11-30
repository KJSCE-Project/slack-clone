import express from "express"
var router = express.Router()
import { body, validationResult } from "express-validator"
import { ChannelService } from "../controllers/channelController.js";

router.post('/', 
    body("wid").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid wid." }),
    body("cname").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid cname." }),
    body("cdesc").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid cdesc." }),
    async (req, res)=>{
        const validationErrors = validationResult(req)
        if (!validationErrors.isEmpty()) {
            res.status(400).send(validationErrors.array()[0].msg)
            return
        }
        
        try {
            let channelService = new ChannelService();
            // Check if user id is null, if yes then insert new record
                let result = await channelService.insertRecord(req);
                console.log(result)
                if(result){
                    res.status(201).send(result);
                    return;
                }else{
                    res.status(400).send({
                        "statusCode": 400,
                        "message": "Could not insert data for channel"
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
    const channelService = new ChannelService();
    try {
        let result = await channelService.getById(cid);
        if (result === null) {
            res.status(404).send({
                code: "data/not-found",
                message: "Channel not found"
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
router.get("/workspace/:wid/channels", async (req, res) => {
    const wid = req.params.wid;
    const channelService = new ChannelService();
    try {
        let result = await channelService.getAllChannels(wid);
        if (result === null) {
            res.status(404).send({
                code: "data/not-found",
                message: "Channels not found"
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