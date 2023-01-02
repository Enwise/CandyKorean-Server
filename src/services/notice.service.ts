import {Notice} from "../interfaces/notice.interface";
import {AppDataSource} from "../config/data-source";
import {NoticeEntity} from "../entities/notice.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";
import {CreateNoticeDto} from "../dtos/notice.dto";

class NoticeService {
    public async findAllNotices(): Promise<Notice[]> {
        const notices: Notice[] = await AppDataSource.manager.find(NoticeEntity);
        return notices;
    }

    public async findNoticeById(noticeId: number) {
        if (isEmpty(noticeId)) throw new HttpException(400, "NoticeId is empty");

        const findNotice: Notice = await NoticeEntity.findOne({where: {notice_id: noticeId}});
        if (!findNotice) throw new HttpException(409, "Notice doesn't exist");

        return findNotice;
    }

    public async createNotice(noticeData: CreateNoticeDto): Promise<Notice> {
        if (isEmpty(noticeData)) throw new HttpException(400, "noticeData is empty");

        const findNotice: Notice = await NoticeEntity.findOne({where: {title: noticeData.title}});
        if (findNotice) throw new HttpException(409, `This title ${noticeData.title} is already exist`);

        const createNoticeData: Notice = await NoticeEntity.create({...noticeData}).save();

        return createNoticeData;
    }

    public async updateNotice(noticeId: number, noticeData: CreateNoticeDto): Promise<Notice> {
        if (isEmpty(noticeData)) throw new HttpException(400, "noticeData is empty");

        const findNotice: Notice = await NoticeEntity.findOne({where: {notice_id: noticeId}});
        if (!findNotice) throw new HttpException(409, "Notice doesn't exist");

        await NoticeEntity.update(noticeId, {...noticeData})

        const updateNotice: Notice = await NoticeEntity.findOne({where: {notice_id: noticeId}});
        return updateNotice;
    }

    public async deleteNotice(noticeId: number): Promise<Notice> {
        if (isEmpty(noticeId)) throw new HttpException(400, "NoticeId is empty");

        const findNotice: Notice = await NoticeEntity.findOne({where: {notice_id: noticeId}});
        if (!findNotice) throw new HttpException(409, "Notice doesn't exist");

        await NoticeEntity.delete(noticeId);
        return findNotice;
    }
}

export default NoticeService;