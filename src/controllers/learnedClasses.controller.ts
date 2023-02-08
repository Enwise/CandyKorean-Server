import LearnedClassesService from "../services/learnedClasses.service";
import {NextFunction, Request, Response} from "express";
import {LearnedClasses} from "../interfaces/learnedClasses.interface";
import {CreateLearnedClassDto} from "../dtos/learnedClasses.dto";
import {plainToInstance} from "class-transformer";

class LearnedClassesController {
    public learnedClassesService = new LearnedClassesService();

    public getLearnedClasses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllLearnedClasses: LearnedClasses[] = await this.learnedClassesService.findAllLearnedClass();

            res.status(200).json({data: findAllLearnedClasses, message: 'findAll'});
        } catch (error) {
            next(error);
        }
    }

    public getPremiumLearnedClasses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findPremiumLearnedClasses: LearnedClasses[] = await this.learnedClassesService.findPremiumLearnedClass();

            res.status(200).json({data: findPremiumLearnedClasses, message: 'find'});
        } catch (error) {
            next(error);
        }
    }

    public getLearnedClassesByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId: number = Number(req.params.id);
            const findLearnedClasses: LearnedClasses[] = await this.learnedClassesService.findLearnedClassByUserId(userId);

            res.status(200).json({data: findLearnedClasses, message: 'find'});
        } catch (error) {
            next(error);
        }
    }

    public createLearnedClass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const learnedClassData: CreateLearnedClassDto = req.body;
            const createLearnedClassData: LearnedClasses = await this.learnedClassesService.createLearnedClass(learnedClassData);

            res.status(201).json({data: createLearnedClassData, message: 'created'});
        } catch (error) {
            next(error);
        }
    }

    public updateLearnedClass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const learnedClassData: CreateLearnedClassDto = plainToInstance(CreateLearnedClassDto,req.body);
            const updateLearnedClassData: LearnedClasses = await this.learnedClassesService.updateLearnedClass(learnedClassData);

            res.status(200).json({data: updateLearnedClassData, message: 'updated'});
        } catch (error) {
            next(error);
        }
    }
}

export default LearnedClassesController;