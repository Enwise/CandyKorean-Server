import {SolvedQuiz} from "../interfaces/solvedQuiz.interface";
import {AppDataSource} from "../config/data-source";
import {SolvedQuizsEntity} from "../entities/solvedQuizs.entity";
import {CreateSolvedQuizDto} from "../dtos/solvedQuizs.dto";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";

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

    public async createSolvedQuiz(solvedQuizData: CreateSolvedQuizDto): Promise<SolvedQuiz> {
        if (isEmpty(solvedQuizData)) throw new HttpException(400, "solvedQuizData is empty");

        const findSolvedQuiz: SolvedQuiz = await SolvedQuizsEntity.findOne({
            where: {
                user_id: solvedQuizData.user_id,
                quiz_id: solvedQuizData.quiz_id
            }
        });
        if (findSolvedQuiz) throw new HttpException(409, "This solvedQuiz is already exists");

        const createSolvedQuizData: SolvedQuiz = await SolvedQuizsEntity.create({...solvedQuizData}).save()

        return createSolvedQuizData;
    }
}

export default SolvedQuizsService;