import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import PurchasedCoursesController from "../controllers/purchasedCourses.controller";

class PurchasedCoursesRoute implements Routes {
    public path = '/purchased_course';
    public router = Router();
    public purchasedCoursesController = new PurchasedCoursesController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.purchasedCoursesController.getPurchasedCourses);
    }
}

export default PurchasedCoursesRoute;