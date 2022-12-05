import multer from "multer";
import {s3Storage} from "./s3.config";

export const upload = multer({
    storage: s3Storage,
})