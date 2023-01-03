import FeedbackService from "../services/feedback.service";
import {NextFunction, Request, Response} from "express";
import {Feedback} from "../interfaces/feedback.interface";
import {CreateFeedbackDto} from "../dtos/feedback.dto";
import {plainToInstance} from "class-transformer";

class FeedbackController {
    public feedbackService = new FeedbackService();

    public getAllFeedback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllFeedback: Feedback[] = await this.feedbackService.findAllFeedbacks();

            res.status(200).json({data: findAllFeedback, message: 'findAll'});
        } catch (error) {
            next(error);
        }
    }

    public getFeedbackById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const feedbackId = Number(req.params.id);
            const findFeedbackById: Feedback = await this.feedbackService.findFeedbackById(feedbackId);

            res.status(200).json({data: findFeedbackById, message: 'findByUserId'});
        } catch (error) {
            next(error);
        }
    }

    public getFeedbackByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = Number(req.params.id);
            const findFeedbackByUserId: Feedback[] = await this.feedbackService.findFeedbackByUserId(userId);

            res.status(200).json({data: findFeedbackByUserId, message: 'findByUserId'});
        } catch (error) {
            next(error);
        }
    }

    public createFeedback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const feedbackData: CreateFeedbackDto = plainToInstance(CreateFeedbackDto, req.body);
            const createFeedbackData: Feedback = await this.feedbackService.createFeedback(feedbackData);

            res.status(201).json({data: createFeedbackData, message: 'created'});
        } catch (error) {
            next(error);
        }
    }

    public updateFeedback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const feedbackId = Number(req.params.id);
            const feedbackData: CreateFeedbackDto = plainToInstance(CreateFeedbackDto, req.body);
            const updateFeedbackData: Feedback = await this.feedbackService.updateFeedback(feedbackId, feedbackData);

            res.status(200).json({data: updateFeedbackData, message: 'updated'});
        } catch (error) {
            next(error)
        }
    }

    public deleteFeedback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const feedbackId = Number(req.params.id);
            const deleteFeedbackData: Feedback = await this.feedbackService.deleteFeedback(feedbackId);

            res.status(200).json({data: deleteFeedbackData, message: 'deleted'});
        } catch (error) {
            next(error);
        }
    }
}

export default FeedbackController;