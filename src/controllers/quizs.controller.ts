import QuizsService from "../services/quizs.service";
import {NextFunction, Request, Response} from "express";
import {Quiz} from "../interfaces/quizs.interface";

class QuizsController {
    public quizsService = new QuizsService();

    public getQuizs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllQuizsData: Quiz[] = await this.quizsService.findAllQuizs();

            res.status(200).json({data: findAllQuizsData, message: 'findAll'});
        } catch (error) {
            next(error);
        }
    }

    public getQuizById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const quizId = Number(req.params.id);
            const findOneQuizData: Quiz = await this.quizsService.findQuizById(quizId);

            res.status(200).json({data: findOneQuizData, message: 'findOne'});
        } catch (error) {
            next(error);
        }
    }
}

export default QuizsController;