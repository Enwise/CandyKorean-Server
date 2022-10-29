import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import ClassesController from "../controllers/classes.controller";

class ClassesRoute implements Routes {
    public path = '/class';
    public router = Router();
    public classesController = new ClassesController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.classesController.getClasses);
    }
}

export default ClassesRoute;