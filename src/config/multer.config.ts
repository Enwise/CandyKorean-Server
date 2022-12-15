import multer from "multer";
import {Request} from "express";

type FileNameCallback = (error: Error | null, filename: string) => void

export const multerConfig = {
    storage: multer.diskStorage({
        destination: 'uploads/',
        filename: function (req: Request, file: Express.Multer.File, cb: FileNameCallback) {
            cb(null, file.originalname);
        }
    })
}
