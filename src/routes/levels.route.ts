import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import LevelsController from "../controllers/levels.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import {CreateLevelDto} from "../dtos/levels.dto";

class LevelsRoute implements Routes {
    public path = '/level';
    public router = Router();
    public levelsController = new LevelsController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.levelsController.getLevels);
        this.router.get(`${this.path}/:id(\\d+)`, this.levelsController.getLevelById);
        this.router.post(`${this.path}`, validationMiddleware(CreateLevelDto), this.levelsController.createLevel);
        this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateLevelDto), this.levelsController.updateLevel);
    }
}

export default LevelsRoute;