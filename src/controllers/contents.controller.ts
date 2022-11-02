import ContentsService from "../services/contents.service";
import {NextFunction, Request, Response} from "express";
import {Content} from "../interfaces/contents.interface";
import {CreateContentDto} from "../dtos/contents.dto";
import {CreateClassesDto} from "../dtos/classes.dto";
import {Class} from "../interfaces/classes.interface";

class ContentsController {
    public contentsService = new ContentsService();

    public getContents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllContentsData: Content[] = await this.contentsService.findAllContents();

            res.status(200).json({data: findAllContentsData, message: 'findAll'});
        } catch (error) {
            next(error);
        }
    }

    public getContentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const contentId = Number(req.params.id);
            const findOneContentData: Content = await this.contentsService.findContentById(contentId);

            res.status(200).json({data: findOneContentData, message: 'findOne'});
        } catch (error) {
            next(error);
        }
    }

    public createContent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const contentData: CreateContentDto = req.body;
            const createContentData: Content = await this.contentsService.createContent(contentData);

            res.status(201).json({data: createContentData, message: 'created'});
        } catch (error) {
            next(error);
        }
    }

    public updateContent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const contentId = Number(req.params.id);
            const contentData: CreateContentDto = req.body;
            const updateContentData: Content = await this.contentsService.updateContent(contentId, contentData);

            res.status(200).json({data: updateContentData, message: 'updated'});
        } catch (error) {
            next(error)
        }
    }
}

export default ContentsController;