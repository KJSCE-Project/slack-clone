import cloudinary from "../config/cloudinary.config.js";

export class Cloudinary {
    async uploadImage(file) {
        let res = await cloudinary.uploader.upload(file.tempFilePath, async (err) => {
            if (err)
                throw new CloudinaryImageUploadError(err);
        });
        return res;
    }
}
export class CloudinaryImageUploadError extends Error {
    constructor(message) {
        super(message);
        this.name = "CloudinaryImageUploadError";
    }
}