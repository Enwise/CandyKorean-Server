import {AppDataSource} from "../config/data-source";
import {Content} from "../interfaces/contents.interface";
import {ContentsEntity} from "../entities/contents.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";

class ContentsService {
    public async findAllContents(): Promise<Content[]> {
        const contents: Content[] = await AppDataSource.getRepository(ContentsEntity).find({});
        return contents;
    }

    public async findContentById(contentId: number): Promise<Content> {
        if (isEmpty(contentId)) throw new HttpException(400, "contentId is empty");

        const findContent: Content = await ContentsEntity.findOne({where: {content_id: contentId}})
        if (!findContent) throw new HttpException(409, "Content doesn't exist");

        return findContent;
    }
}

export default ContentsService;