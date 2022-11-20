import express from "express"
var router = express.Router()
import { body, validationResult } from "express-validator"
import { InvitationService } from "../controllers/invitationController.js";

router.post('/', 
    body("status").isBoolean().withMessage({ code: "field/invalid-value", message: "Invalid status." }),
    body("email").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid uid." }),
    async (req, res)=>{
        const validationErrors = validationResult(req)
        if (!validationErrors.isEmpty()) {
            res.status(400).send(validationErrors.array()[0].msg)
            return
        }
        
        try {
            let invitationService = new InvitationService();
            // Check if user id is null, if yes then insert new record
                let result = await invitationService.insertRecord(req);
                console.log(result)
                if(result){
                    res.status(201).send(result);
                    return;
                }else{
                    res.status(400).send({
                        "statusCode": 400,
                        "message": "Could not insert data for invitation"
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
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const invitationService = new InvitationService();
    try {
        let result = await invitationService.getById(id);
        if (result === null) {
            res.status(404).send({
                code: "data/not-found",
                message: "Invitation not found"
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