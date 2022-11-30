import {AppDataSource} from "../config/data-source";
import {Content} from "../interfaces/contents.interface";
import {ContentsEntity} from "../entities/contents.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";
import {Class} from "../interfaces/classes.interface";
import {ClassesEntity} from "../entities/classes.entity";
import {CreateContentDto} from "../dtos/contents.dto";

class ContentsService {
    public async findAllContents(): Promise<Content[]> {
        const contents: Content[] = await AppDataSource.getRepository(ContentsEntity).find({relations: {class_entity: true}});
        return contents;
    }

    public async findContentById(contentId: number): Promise<Content> {
        if (isEmpty(contentId)) throw new HttpException(400, "contentId is empty");

        const findContent: Content = await ContentsEntity.findOne({where: {content_id: contentId}})
        if (!findContent) throw new HttpException(409, "Content doesn't exist");

        return findContent;
    }

    public async createContent(contentData: CreateContentDto): Promise<Content> {
        if (isEmpty(contentData)) throw new HttpException(400, "ContentData is empty");

        const findContent: Content = await ContentsEntity.findOne({where: {name: contentData.name}});
        if (findContent) throw new HttpException(409, `this content name ${contentData.name} already exists`);

        const findClass: Class = await ClassesEntity.findOne({where: {class_id: contentData.class_id}});
        if (!findClass) throw new HttpException(409, "Class doesn't exist");

        const createContentData: Content = await ContentsEntity.create({...contentData, class_entity: findClass}).save();

        return createContentData;
    }

    public async updateContent(contentId: number, contentData: CreateContentDto): Promise<Content> {
        if (isEmpty(contentId)) throw new HttpException(400, "Content is empty");

        const findContent: Content = await ContentsEntity.findOne({where: {content_id: contentId}});
        if (!findContent) throw new HttpException(409, "Content doesn't exist");

        const findClass: Class = await ClassesEntity.findOne({where: {class_id: contentData.class_id}});
        if (!findClass) throw new HttpException(409, "Class doesn't exist");

        await ContentsEntity.update(contentId, {...contentData});

        const updateContent: Content = await ContentsEntity.findOne({where: {content_id: contentId}});

        return updateContent;
    }

    public async deleteContent(contentId: number): Promise<Content> {
        if (isEmpty(contentId)) throw new HttpException(400, "Content is empty");

        const findContent: Content = await ContentsEntity.findOne({where: {content_id: contentId}});
        if (!findContent) throw new HttpException(409, "Content doesn't exist");

        await ContentsEntity.delete(contentId);

        return findContent;
    }
}

export default ContentsService;