import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import PurchasedCoursesController from "../controllers/purchasedCourses.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import {CreatePurchasedCourseDto} from "../dtos/purchasedCourses.dto";

class PurchasedCoursesRoute implements Routes {
    public path = '/purchased_course';
    public router = Router();
    public purchasedCoursesController = new PurchasedCoursesController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.purchasedCoursesController.getPurchasedCourses);
        this.router.get(`${this.path}/:id(\\d+)`, this.purchasedCoursesController.getPurchasedCourseByUserId);
        this.router.post(`${this.path}`, validationMiddleware(CreatePurchasedCourseDto), this.purchasedCoursesController.createPurchasedCourse);
    }
}

export default PurchasedCoursesRoute;