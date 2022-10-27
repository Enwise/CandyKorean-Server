import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import CoursesController from "../controllers/courses.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import {CreateLevelDto} from "../dtos/levels.dto";
import {CreateCourseDto} from "../dtos/courses.dto";

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
        this.router.post(`${this.path}`, validationMiddleware(CreateCourseDto), this.courseController.createCourse);
    }

}

export default CoursesRoute;