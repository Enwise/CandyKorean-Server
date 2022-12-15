import {FileInfo} from "../interfaces/fileInfos.interface";
import {FileInfosEntity} from "../entities/fileInfos.entity";

class FileInfosService {
    public async uploadFileToS3(fileData: any): Promise<FileInfo> {
        const createFileInfo: FileInfo = await FileInfosEntity.create({link:fileData.location, fileName:fileData.originalname});

        return createFileInfo;
    }
}

export default FileInfosService;