import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import LevelsController from "../controllers/levels.controller";

class LevelsRoute implements Routes  {
    public path = '/level';
    public router = Router();
    public levelsController = new LevelsController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.get(`${this.path}`,this.levelsController.getLevels);
        this.router.get(`${this.path}/:id(\\d+)`, this.levelsController.getLevelById);
    }
}

export default LevelsRoute;