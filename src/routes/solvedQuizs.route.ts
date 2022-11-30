import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import SolvedQuizsController from "../controllers/solvedQuizs.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import {CreateSolvedQuizDto} from "../dtos/solvedQuizs.dto";

class SolvedQuizsRoute implements Routes {
    public path = '/solved_quiz';
    public router = Router();
    public solvedQuizController = new SolvedQuizsController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.solvedQuizController.getSolvedQuizs);
        this.router.get(`${this.path}/:id(\\d+)`, this.solvedQuizController.getSolvedQuizByUser);
        this.router.post(`${this.path}`, validationMiddleware(CreateSolvedQuizDto, 'body'), this.solvedQuizController.createSolvedQuiz);
    }
}

export default SolvedQuizsRoute;