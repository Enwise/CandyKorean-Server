import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import LearnedClassesController from "../controllers/learnedClasses.controller";

class LearnedClassesRoute implements Routes {
    public path = '/learned_class';
    public router = Router();
    public learnedClassesController = new LearnedClassesController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.learnedClassesController.getLearnedClasses);
    }
}

export default LearnedClassesRoute;