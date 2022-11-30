import {NextFunction, Request, Response} from "express";
import {SolvedQuiz} from "../interfaces/solvedQuiz.interface";
import SolvedQuizsService from "../services/solvedQuizs.service";

class SolvedQuizsController {
    public solvedQuizService = new SolvedQuizsService();

    public getSolvedQuizs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllSolvedQuiz: SolvedQuiz[] = await this.solvedQuizService.findAllSolvedQuiz()

            res.status(200).json({data: findAllSolvedQuiz, message: 'findAll'});
        } catch (error) {
            next(error);
        }
    }

    public getSolvedQuizByUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = Number(req.params.id);
            const findSolvedQuizByUser: SolvedQuiz[] = await this.solvedQuizService.findSolvedQuizByUser(userId);

            res.status(200).json({data: findSolvedQuizByUser, message: 'findByUser'});
        } catch (error) {
            next(error);
        }
    }

    public createSolvedQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const solvedQuizData = req.body;
            const createSolvedQuizData: SolvedQuiz = await this.solvedQuizService.createSolvedQuiz(solvedQuizData);

            res.status(201).json({data: createSolvedQuizData, message: 'created'});
        } catch (error) {
            next(error);
        }
    }

    public updateSolvedQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const solvedQuizData = req.body;
            const updateSolvedQuizData: SolvedQuiz = await this.solvedQuizService.updateSolvedQuiz(solvedQuizData);

            res.status(200).json({data: updateSolvedQuizData, message: 'updated'});
        } catch (error) {
            next(error);
        }
    }
}

export default SolvedQuizsController;