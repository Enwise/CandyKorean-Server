import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import TutorsController from "../controllers/tutors.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import {CreateTutorDto} from "../dtos/tutors.dto";

class TutorsRoute implements Routes {
    public path = '/tutor';
    public router = Router();
    public tutorsController = new TutorsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.tutorsController.getTutors);
        this.router.get(`${this.path}/:id(\\d+)`, this.tutorsController.getTutorById);
        this.router.post(`${this.path}`, validationMiddleware(CreateTutorDto, 'body'), this.tutorsController.createTutor);
        this.router.put(`${this.path}/:id(\\d+)`,validationMiddleware(CreateTutorDto,'body'),this.tutorsController.updateTutor);
        this.router.delete(`${this.path}/:id(\\d+)`,this.tutorsController.deleteTutor);
    }
}

export default TutorsRoute;