import {AppDataSource} from "../config/data-source";
import {Content} from "../interfaces/contents.interface";
import {ContentsEntity} from "../entities/contents.entity";

class ContentsService {
    public async findAllContents(): Promise<Content[]> {
        const contents: Content[] = await AppDataSource.getRepository(ContentsEntity).find({});
        return contents;
    }
}

export default ContentsService;