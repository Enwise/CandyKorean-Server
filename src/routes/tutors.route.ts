import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import TutorsController from "../controllers/tutors.controllers";

class TutorsRoute implements Routes {
    public path = '/tutor';
    public router = Router();
    public tutorsController  = new TutorsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes()  {
        this.router.get(`${this.path}`, this.tutorsController.getTutors);
        this.router.get(`${this.path}/:id(\\d+)`,this.tutorsController.getTutorById);
    }
}

export default TutorsRoute;