import express from "express"
var router = express.Router()
import { body, validationResult } from "express-validator"
import { UseWorkspaceService } from "../controllers/useworkspaceController.js";

router.post('/', 
    body("wid").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid workspace id." }),
    body("uid").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid uid." }),
    async (req, res)=>{
        const validationErrors = validationResult(req)
        if (!validationErrors.isEmpty()) {
            res.status(400).send(validationErrors.array()[0].msg)
            return
        }
        
        try {
            let useworkspaceService = new UseWorkspaceService();
            // Check if user id is null, if yes then insert new record
                let result = await useworkspaceService.upsertRecord(req);
                console.log(result)
                if(result){
                    res.status(201).send(result);
                    return;
                }else{
                    res.status(400).send({
                        "statusCode": 400,
                        "message": "Could not insert data for useworkspace"
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
router.get("/:uid", async (req, res) => {
    const uid = req.params.uid;
    const useworkspaceService = new UseWorkspaceService();
    try {
        let workspace = await useworkspaceService.getById(uid);
        if (workspace === null) {
            res.status(404).send({
                code: "data/not-found",
                message: "useWorkspace not found"
            });
            return;
        }
        res.send(workspace);
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
export default router