import QuizsService from "../services/quizs.service";
import {NextFunction, Request, Response} from "express";
import {Quiz} from "../interfaces/quizs.interface";
import {CreateQuizDto} from "../dtos/quizs.dto";

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

    public createQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const quizData: CreateQuizDto = req.body;
            const createQuizData: Quiz = await this.quizsService.createQuiz(quizData);

            res.status(201).json({data: createQuizData, message: 'created'});
        } catch (error) {
            next(error);
        }
    }

    public updateQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const quizId = Number(req.params.id);
            const quizData: CreateQuizDto = req.body;
            const updateQuizData: Quiz = await this.quizsService.updateQuiz(quizId, quizData);

            res.status(200).json({data: updateQuizData, message: 'updated'});
        } catch (error) {
            next(error)
        }
    }
}

export default QuizsController;