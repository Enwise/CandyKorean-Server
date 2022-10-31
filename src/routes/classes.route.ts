import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import ClassesController from "../controllers/classes.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import {CreateClassesDto} from "../dtos/classes.dto";

class ClassesRoute implements Routes {
    public path = '/class';
    public router = Router();
    public classesController = new ClassesController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.classesController.getClasses);
        this.router.get(`${this.path}/:id(\\d+)`, this.classesController.getClassById);
        this.router.post(`${this.path}`, validationMiddleware(CreateClassesDto), this.classesController.createClass);
        this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateClassesDto), this.classesController.updateClass);
    }
}

export default ClassesRoute;