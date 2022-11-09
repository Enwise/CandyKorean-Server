import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import SlidesController from "../controllers/slides.controller";

class SlidesRoute implements Routes {
    public path = '/class';
    public router = Router();
    public slidesController = new SlidesController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.slidesController.getSlides);
        this.router.get(`${this.path}/:id(\\d+)`, this.slidesController.getSlideById);
    }
}

export default SlidesRoute;