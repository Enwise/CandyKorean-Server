import AssistantService from "../services/assistant.service";
import {NextFunction, Request, Response} from "express";
import {plainToInstance} from "class-transformer";
import {CreateAssistantDto} from "../dtos/assistant.dto";

class AssistantController {
    public assistantService = new AssistantService();

    public getAllAssistants = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllAssistants = await this.assistantService.findAllAssistants();

            res.status(200).json({data: findAllAssistants, message: 'findAll'});
        } catch (error) {
            next(error);
        }
    }

    public getAssistantById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const assistantId = Number(req.params.id);
            const findAssistant = await this.assistantService.findAssistantById(assistantId);

            res.status(200).json({data: findAssistant, message: 'findOne'});
        } catch (error) {
            next(error);
        }
    }

    public createAssistant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const assistantData = plainToInstance(CreateAssistantDto, req.body);
            const createAssistant = await this.assistantService.createAssistant(assistantData);

            res.status(201).json({data: createAssistant, message: 'created'});
        } catch (error) {
            next(error);
        }
    }

    public updateAssistant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const assistantId = Number(req.params.id);
            const assistantData = plainToInstance(CreateAssistantDto, req.body);
            const updateAssistant = await this.assistantService.updateAssistant(assistantId, assistantData);

            res.status(200).json({data: updateAssistant, message: 'updated'});
        } catch (error) {
            next(error);
        }
    }

    public deleteAssistant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const assistantId = Number(req.params.id);
            const deleteAssistant = await this.assistantService.deleteAssistant(assistantId);

            res.status(200).json({data: deleteAssistant, message: 'deleted'});
        } catch (error) {
            next(error);
        }
    }
}

export default AssistantController;