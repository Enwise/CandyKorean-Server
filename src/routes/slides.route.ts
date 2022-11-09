import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import SlidesController from "../controllers/slides.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import {CreateSlideDto} from "../dtos/slides.dto";

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
        this.router.post(`${this.path}`, validationMiddleware(CreateSlideDto), this.slidesController.createSlide);
        this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateSlideDto), this.slidesController.updateSlide);
        this.router.delete(`${this.path}/:id(\\d+)`, this.slidesController.deleteSlide);
    }
}

export default SlidesRoute;