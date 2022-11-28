import express, { application } from "express"
var router = express.Router()
import { body, validationResult } from "express-validator"
import { UserService } from "../controllers/userController.js";

router.post('/', 
    body("username").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid username." }),
    body("first_name").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid first_name." }),
    body("last_name").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid last name." }),
    body("email").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid email." }),
    body("password").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid password." }),
    body("profile").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid profile." }),
    body("login_type").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid login type." }),
    body("user_type").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid user type." }),
    body("role").notEmpty().withMessage({ code: "field/invalid-value", message: "Invalid role." }),
    async (req, res)=>{
        const validationErrors = validationResult(req)
        if (!validationErrors.isEmpty()) {
            res.status(400).send(validationErrors.array()[0].msg)
            return
        }
        
        try {
            let userService = new UserService();
            // Check if user id is null, if yes then insert new record
            if(!req.body.uid || req.body.uid == ""){

                let result = await userService.insertRecord(req);
                if(result){
                    res.status(201).send(result);
                    return;
                }else{
                    res.status(400).send({
                        "statusCode": 400,
                        "message": "Could not insert data for user"
                    })
                }
            }else{
                // else update existing user
                let result = await userService.updateRecord(req);
                if(result){
                    res.status(201).send(result);
                    return;
                }else{
                    res.status(400).send({
                        "statusCode": 400,
                        "message": "Could not update data for user"
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

router.post('/login',
    async (req, res)=>{        
        try {
            let userService = new UserService();
            // Check if username or email is null, if yes then insert new record
            if((req.body.username!="" && req.body.email!="")){

                let result = await userService.login(req);
                if(result){
                    res.status(201).send(result);
                    return;
                }else{
                    res.status(400).send({
                        "statusCode": 400,
                        "message": "Could not login user"
                    })
                }
            }
            else{
                res.status(400).send({
                    "statusCode": 400,
                    "message": "Could not login user. Invalid credentials."
                })
            }
        }
        catch (error) {
            res.status(500).send({
                code: "server/internal-error",
                message: "An internal server error has occured"
            });
        }
});

router.get("/:uid", async (req, res) => {
    const uid = req.params.uid;
    const userService = new UserService();
    try {
        let user = await userService.getById(uid);
        if (user === null) {
            res.status(404).send({
                code: "data/not-found",
                message: "User not found"
            });
            return;
        }
        res.send(user);
        return;
    }
    catch (error) {
        logger.error(error);
        res.status(500).send({
            code: "server/internal-error",
            message: "An internal server has occured"
        });
    }
});

export default router