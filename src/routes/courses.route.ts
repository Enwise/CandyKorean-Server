import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import CoursesController from "../controllers/courses.controller";

class CoursesRoute implements Routes {
    public path = '/course';
    public router = Router();
    public courseController = new CoursesController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.courseController.getCourses);
        this.router.get(`${this.path}/:id(\\d+)`, this.courseController.getCourseById);
    }

}

export default CoursesRoute;