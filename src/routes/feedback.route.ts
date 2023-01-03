import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import FeedbackController from "../controllers/feedback.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import {CreateFeedbackDto} from "../dtos/feedback.dto";

class FeedbackRoute implements Routes {
    public path = '/feedback';
    public router = Router();
    public feedbackController = new FeedbackController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.feedbackController.getAllFeedback);
        this.router.get(`${this.path}/:id(\\d+)`, this.feedbackController.getFeedbackById);
        this.router.get(`${this.path}/user/:id(\\d+)`, this.feedbackController.getFeedbackByUserId);
        this.router.post(`${this.path}`, validationMiddleware(CreateFeedbackDto), this.feedbackController.createFeedback);
        this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateFeedbackDto), this.feedbackController.updateFeedback);
        this.router.delete(`${this.path}/:id(\\d+)`, this.feedbackController.deleteFeedback);
    }
}

export default FeedbackRoute;