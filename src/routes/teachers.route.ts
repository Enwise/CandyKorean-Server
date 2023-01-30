import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import TeachersController from "../controllers/teachers.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import {CreateTeacherDto} from "../dtos/teachers.dto";

class TeachersRoute implements Routes {
    public path = '/tutor';
    public router = Router();
    public tutorsController = new TeachersController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.tutorsController.getTutors);
        this.router.get(`${this.path}/:id(\\d+)`, this.tutorsController.getTutorById);
        this.router.post(`${this.path}`, validationMiddleware(CreateTeacherDto, 'body'), this.tutorsController.createTutor);
        this.router.put(`${this.path}/:id(\\d+)`,validationMiddleware(CreateTeacherDto,'body'),this.tutorsController.updateTutor);
        this.router.delete(`${this.path}/:id(\\d+)`,this.tutorsController.deleteTutor);
    }
}

export default TeachersRoute;