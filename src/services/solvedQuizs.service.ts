import {SolvedQuiz} from "../interfaces/solvedQuiz.interface";
import {AppDataSource} from "../config/data-source";
import {SolvedQuizsEntity} from "../entities/solvedQuizs.entity";

class SolvedQuizsService {
    public async findAllSolvedQuiz(): Promise<SolvedQuiz[]> {
        const solvedQuizs: SolvedQuiz[] = await AppDataSource.getRepository(SolvedQuizsEntity).find({
            relations: {
                user: true,
                quiz: true
            }
        })
        return solvedQuizs;
    }

    public async findSolvedQuizByUser(userId: number): Promise<SolvedQuiz[]> {
        const solvedQuiz: SolvedQuiz[] = await SolvedQuizsEntity.find({
            where: {user_id: userId},
            relations: {user: true, quiz: true}
        });
        return solvedQuiz;
    }
}

export default SolvedQuizsService;