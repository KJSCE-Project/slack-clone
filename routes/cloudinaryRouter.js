import express from "express"
var router = express.Router()
import { Cloudinary, CloudinaryImageUploadError, } from "../controllers/cloudinaryController.js";

router.post("/upload", async (req, res, next) => {
    if (req.files === null) {
        res.status(404).send({
            code: "data/not-found",
            message: "File not found",
        });
        return;
    }
    //@ts-expect-errors
    const file = req.files.photo;
    if (file == null) {
        res.status(404).send({
            code: "data/not-found",
            message: "Please use 'photo' as name of image",
        });
        return;
    }
    try {
        let Cloud = new Cloudinary();
        let result = await Cloud.uploadImage(file);
        if (result) {
            res.status(201).json({
                public_id: result.public_id,
                secure_url: result.secure_url, // https link to the image
            });
            return;
        }
        else {
            res.status(400).send({
                code: "data/no-cloudinary-response",
                message: `No Response from Cloudinary`,
            });
            return;
        }
    }
    catch (error) {
        logger.error(error, "An error occured while uploading image to Cloudinary for user id: " + id);
        if (error instanceof CloudinaryImageUploadError) {
            res.status(400).send({
                code: "data/image-upload-error",
                message: `Cannot upload image to cloudinary due to error`,
            });
            return;
        }
        res.status(500).send({
            code: "server/internal-error",
            message: "An internal server has occured",
        });
    }
});

export default router