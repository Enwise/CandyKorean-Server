import LearnedClassesService from "../services/learnedClasses.service";
import {NextFunction, Request, Response} from "express";
import {LearnedClasses} from "../interfaces/learnedClasses.interface";

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
}

export default LearnedClassesController;