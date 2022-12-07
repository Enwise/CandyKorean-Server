import FileInfosService from "../services/fileInfos.service";
import {NextFunction, Request, Response} from "express";

class FileInfosController {
    private fileInfosService = new FileInfosService();

    public uploadFileToS3 = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const file:Express.Multer.File = req.file;
            console.log(file);
            const data = await this.fileInfosService.uploadFileToS3(file);

            res.status(201).json({data: data, message: 'created'});
        } catch (error) {
            console.log(error.stack)
            next(error)
        }
    }
}

export default FileInfosController;