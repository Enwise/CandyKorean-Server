import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import LearnedClassesController from "../controllers/learnedClasses.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import {CreateLearnedClassDto} from "../dtos/learnedClasses.dto";

class LearnedClassesRoute implements Routes {
    public path = '/learned_class';
    public router = Router();
    public learnedClassesController = new LearnedClassesController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.learnedClassesController.getLearnedClasses);
        this.router.get(`${this.path}/premium`, this.learnedClassesController.getPremiumLearnedClasses);
        this.router.post(`${this.path}`, validationMiddleware(CreateLearnedClassDto), this.learnedClassesController.createLearnedClass);
        this.router.put(`${this.path}`, validationMiddleware(CreateLearnedClassDto), this.learnedClassesController.updateLearnedClass);
    }
}

export default LearnedClassesRoute;