import {Quiz} from "../interfaces/quizs.interface";
import {AppDataSource} from "../config/data-source";
import {QuizsEntity} from "../entities/quizs.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";

class QuizsService {
    public async findAllQuizs(): Promise<Quiz[]> {
        const quizs: Quiz[] = await AppDataSource.getRepository(QuizsEntity).find({relations: {content: true}})
        return quizs
    }

    public async findQuizById(quizId: number): Promise<Quiz> {
        if (isEmpty(quizId)) throw new HttpException(400, "quizId is empty");

        const findQuiz: Quiz = await QuizsEntity.findOne({where: {quiz_id: quizId}})
        if (!findQuiz) throw new HttpException(409, "Quiz doesn't exist");

        return findQuiz;
    }
}

export default QuizsService;