import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import NoticeController from "../controllers/notice.controller";
import {CreateNoticeDto} from "../dtos/notice.dto";

class NoticeRoute implements Routes{
    public path = '/level';
    public router = Router();
    public noticeController = new NoticeController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.noticeController.getNotices);
        this.router.get(`${this.path}/:id(\\d+)`, this.noticeController.getNoticeById);
        this.router.post(`${this.path}`, validationMiddleware(CreateNoticeDto), this.noticeController.createNotice);
        this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateNoticeDto), this.noticeController.updateNotice);
        this.router.delete(`${this.path}/:id(\\d+)`, this.noticeController.deleteNotice);
    }
}

export default NoticeRoute;