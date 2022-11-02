import ContentsService from "../services/contents.service";
import {NextFunction, Request, Response} from "express";
import {Content} from "../interfaces/contents.interface";

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
}

export default ContentsController;