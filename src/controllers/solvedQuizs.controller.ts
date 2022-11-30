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
}

export default SolvedQuizsController;