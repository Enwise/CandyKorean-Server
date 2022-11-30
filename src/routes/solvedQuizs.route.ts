import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import SolvedQuizsController from "../controllers/solvedQuizs.controller";

class SolvedQuizsRoute implements Routes{
    public path = '/solved_quiz';
    public router = Router();
    public solvedQuizController = new SolvedQuizsController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.solvedQuizController.getSolvedQuizs);
        this.router.get(`${this.path}/:id(\\d+)`, this.solvedQuizController.getSolvedQuizByUser);
    }
}

export default SolvedQuizsRoute;