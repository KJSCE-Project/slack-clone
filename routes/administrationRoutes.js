import express from "express"
var router = express.Router()
import { body, validationResult } from "express-validator"
import { AdministrationService } from "../controllers/administrationController.js";

router.post('/', 
    body("uid").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid uid." }),
    body("wid").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid channel id." }),
    async (req, res)=>{
        const validationErrors = validationResult(req)
        if (!validationErrors.isEmpty()) {
            res.status(400).send(validationErrors.array()[0].msg)
            return
        }
        
        try {
            let administrationService = new AdministrationService();
            // Check if user id is null, if yes then insert new record
                let result = await administrationService.insertRecord(req);
                console.log(result)
                if(result){
                    res.status(201).send(result);
                    return;
                }else{
                    res.status(400).send({
                        "statusCode": 400,
                        "message": "Could not insert data for administration"
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
router.get("/:wid", async (req, res) => {
    const wid = req.params.wid;
    const administrationService = new AdministrationService();
    try {
        let result = await administrationService.getById(wid);
        if (result === null) {
            res.status(404).send({
                code: "data/not-found",
                message: "Administration not found"
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