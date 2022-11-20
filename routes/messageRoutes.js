import express from "express"
var router = express.Router()
import { body, validationResult } from "express-validator"
import { MessageService } from "../controllers/messageController.js";

router.post('/', 
    body("cid").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid channel id." }),
    body("uid").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid uid." }),
    body("content").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid content." }),
    body("mtype").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid message type." }),
    async (req, res)=>{
        const validationErrors = validationResult(req)
        if (!validationErrors.isEmpty()) {
            res.status(400).send(validationErrors.array()[0].msg)
            return
        }
        
        try {
            let messageService = new MessageService();
            // Check if user id is null, if yes then insert new record
                let result = await messageService.insertRecord(req);
                console.log(result)
                if(result){
                    res.status(201).send(result);
                    return;
                }else{
                    res.status(400).send({
                        "statusCode": 400,
                        "message": "Could not insert data for message"
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
router.get("/:mid", async (req, res) => {
    const mid = req.params.mid;
    const messageService = new MessageService();
    try {
        let result = await messageService.getById(mid);
        if (result === null) {
            res.status(404).send({
                code: "data/not-found",
                message: "Message not found"
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