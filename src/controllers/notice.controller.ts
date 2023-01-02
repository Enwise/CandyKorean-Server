import NoticeService from "../services/notice.service";
import {NextFunction, Request, Response} from "express";
import {Notice} from "../interfaces/notice.interface";
import {CreateNoticeDto} from "../dtos/notice.dto";
import {plainToInstance} from "class-transformer";

class NoticeController {
    public noticeService = new NoticeService();

    public getNotices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllNoticesData: Notice[] = await this.noticeService.findAllNotices();

            res.status(200).json({data: findAllNoticesData, message: 'FindAll'});
        } catch (error) {
            next(error);
        }
    }

    public getNoticeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const noticeId = Number(req.params.id);
            const findNoticeByIdData: Notice = await this.noticeService.findNoticeById(noticeId);

            res.status(200).json({data: findNoticeByIdData, message: 'findAll'});
        } catch (error) {
            next(error);
        }
    }

    public createNotice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const noticeData: CreateNoticeDto = plainToInstance(CreateNoticeDto, req.body);
            const createNoticeData: Notice = await this.noticeService.createNotice(noticeData);

            res.status(201).json({data: createNoticeData, message: 'created'});
        } catch (error) {
            next(error);
        }
    }

    public updateNotice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const noticeId = Number(req.params.id);
            const noticeData: CreateNoticeDto = plainToInstance(CreateNoticeDto, req.body);
            const updateNoticeData: Notice = await this.noticeService.updateNotice(noticeId, noticeData);

            res.status(200).json({data: updateNoticeData, message: 'updated'});
        } catch (error) {
            next(error)
        }
    }

    public deleteNotice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const noticeId = Number(req.params.id);
            const deleteClassData: Notice = await this.noticeService.deleteNotice(noticeId);

            res.status(200).json({data: deleteClassData, message: 'deleted'});
        } catch (error) {
            next(error);
        }
    }
}

export default NoticeController;