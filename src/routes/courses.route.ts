import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import coursesController from "../controllers/courses.controller";

class CoursesRoute implements Routes {
    public path = '/course';
    public router = Router();
    public courseController = new coursesController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.courseController.getCourses);
    }

}

export default CoursesRoute;