import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import quizsController from "../controllers/quizs.controller";

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
    }
}

export default QuizsRoute;