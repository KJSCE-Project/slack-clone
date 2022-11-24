import express, { application } from "express"
var router = express.Router()
import { body, validationResult } from "express-validator"
import { WorkspaceService } from "../controllers/workspaceController.js";

router.post('/', 
    body("wname").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid workspace name." }),
    body("desc").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid desc." }),
    body("uid").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid uid." }),
    async (req, res)=>{
        const validationErrors = validationResult(req)
        if (!validationErrors.isEmpty()) {
            res.status(400).send(validationErrors.array()[0].msg)
            return
        }
        
        try {
            let workspaceService = new WorkspaceService();
            // Check if user id is null, if yes then insert new record
            if(!req.body.wid || req.body.wid == ""){

                let result = await workspaceService.insertRecord(req);
                console.log(result)
                if(result){
                    res.status(201).send(result);
                    return;
                }else{
                    res.status(400).send({
                        "statusCode": 400,
                        "message": "Could not insert data for workspace"
                    })
                }
            }else{
                // else update existing user
                let result = await workspaceService.updateRecord(req);
                if(result){
                    res.status(201).send(result);
                    return;
                }else{
                    res.status(400).send({
                        "statusCode": 400,
                        "message": "Could not update data for workspace"
                    })
                }
            }
        }
        catch (error) {
            res.status(500).send({
                code: "server/internal-error",
                message: "An internal server error has occured"
            });
        }
});

router.get("/:wid", async (req, res) => {
    const wid = req.params.wid;
    const workspaceService = new WorkspaceService();
    try {
        let workspace = await workspaceService.getById(wid);
        if (workspace === null) {
            res.status(404).send({
                code: "data/not-found",
                message: "Workspace not found"
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

router.get("/user/:uid", async (req, res) => {
    const uid = req.params.uid;
    const workspaceService = new WorkspaceService();
    try {
        let workspace = await workspaceService.getAllByUserId(uid);
        if (workspace === null) {
            res.status(404).send({
                code: "data/not-found",
                message: "Workspaces for user not found"
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