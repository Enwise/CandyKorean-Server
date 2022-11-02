import {Router} from "express";
import {Routes} from "../interfaces/router.interfaces";
import contentsController from "../controllers/contents.controller";

class ContentsRoute implements Routes {
    public path = '/content';
    public router = Router();
    public contentsController = new contentsController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.get(`${this.path}`, this.contentsController.getContents);
        this.router.get(`${this.path}/:id(\\d+)`, this.contentsController.getContentById);
    }
}

export default ContentsRoute;