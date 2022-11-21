import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import quizsController from "../controllers/quizs.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import {CreateQuizDto} from "../dtos/quizs.dto";

class QuizsRoute implements Routes {
    public path = '/content';
    public router = Router();
    public quizsController = new quizsController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.quizsController.getQuizs);
        this.router.get(`${this.path}/:id(\\d+)`, this.quizsController.getQuizById);
        this.router.post(`${this.path}`, validationMiddleware(CreateQuizDto), this.quizsController.createQuiz);
    }
}

export default QuizsRoute;