import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import AssistantController from "../controllers/assistant.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import {CreateAssistantDto} from "../dtos/assistant.dto";

class AssistantRoute implements Routes {
    public path = '/assistant';
    public router = Router();
    public assistantController = new AssistantController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.assistantController.getAllAssistants);
        this.router.get(`${this.path}/:id(\\d+)`, this.assistantController.getAssistantById);
        this.router.post(`${this.path}`, validationMiddleware(CreateAssistantDto, 'body'), this.assistantController.createAssistant);
        this.router.put(`${this.path}/:id(\\d+)`,validationMiddleware(CreateAssistantDto,'body'),this.assistantController.updateAssistant);
        this.router.delete(`${this.path}/:id(\\d+)`,this.assistantController.deleteAssistant);
    }
}

export default AssistantRoute;