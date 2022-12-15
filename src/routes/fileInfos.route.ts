import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import FileInfosController from "../controllers/fileInfos.controller";
import {multerConfig} from "../config/multer.config";
import multer from "multer";
import {upload} from "../config/s3.config";

class FileInfosRoute implements Routes {
    public path = '/upload';
    public router = Router();
    public fileInfosController = new FileInfosController();
    public upload = multer(multerConfig);
    public uploadS3 = upload;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`,this.uploadS3.single('file'),this.fileInfosController.uploadFileToS3);
    }
}

export default FileInfosRoute;