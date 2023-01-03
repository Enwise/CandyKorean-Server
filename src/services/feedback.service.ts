import {Feedback} from "../interfaces/feedback.interface";
import {AppDataSource} from "../config/data-source";
import {FeedbackEntity} from "../entities/feedback.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";
import {CreateFeedbackDto} from "../dtos/feedback.dto";

class FeedbackService {
    public async findAllFeedbacks(): Promise<Feedback[]> {
        const feedbacks: Feedback[] = await AppDataSource.manager.find(FeedbackEntity);
        return feedbacks;
    }

    public async findFeedbackById(feedbackId: number): Promise<Feedback> {
        if (isEmpty(feedbackId)) throw new HttpException(400, "feedbackId is empty");

        const findFeedBack: Feedback = await FeedbackEntity.findOne({where: {feedback_id: feedbackId}});
        if (!findFeedBack) throw new HttpException(409, "Feedback doesn't exist");

        return findFeedBack;
    }

    public async findFeedbackByUserId(userId: number): Promise<Feedback[]> {
        if (isEmpty(userId)) throw new HttpException(400, "userId is empty");

        const findFeedBacks: Feedback[] = await FeedbackEntity.find({
            where: {user_id: userId},
            relations: {user: true}
        });
        if (!findFeedBacks) throw new HttpException(409, "Feedback doesn't exist");

        return findFeedBacks;
    }

    public async createFeedback(feedbackData: CreateFeedbackDto): Promise<Feedback> {
        if (isEmpty(feedbackData)) throw new HttpException(400, "feedbackData is empty");

        const createFeedbackData: Feedback = await FeedbackEntity.create({...feedbackData}).save();

        return createFeedbackData;
    }

    public async updateFeedback(feedbackId: number, feedbackData: CreateFeedbackDto): Promise<Feedback> {
        if (isEmpty(feedbackData)) throw new HttpException(400, "feedbackData is empty");

        const findFeedBack: Feedback = await FeedbackEntity.findOne({where: {feedback_id: feedbackId}});
        if (!findFeedBack) throw new HttpException(409, "Feedback doesn't exist");

        await FeedbackEntity.update(feedbackId, {...feedbackData});

        const updateFeedBack: Feedback = await FeedbackEntity.findOne({where: {feedback_id: feedbackId}});
        return updateFeedBack;
    }

    public async deleteFeedback(feedbackId: number): Promise<Feedback> {
        if (isEmpty(feedbackId)) throw new HttpException(400, "feedbackId is empty");

        const findFeedBack: Feedback = await FeedbackEntity.findOne({where: {feedback_id: feedbackId}});
        if (!findFeedBack) throw new HttpException(409, "Feedback doesn't exist");

        await FeedbackEntity.delete(feedbackId);
        return findFeedBack;
    }
}

export default FeedbackService;