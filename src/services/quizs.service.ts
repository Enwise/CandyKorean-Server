import {Quiz} from "../interfaces/quizs.interface";
import {AppDataSource} from "../config/data-source";
import {QuizsEntity} from "../entities/quizs.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";
import {Content} from "../interfaces/contents.interface";
import {ContentsEntity} from "../entities/contents.entity";
import {CreateQuizDto} from "../dtos/quizs.dto";

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

    public async createQuiz(quizData: CreateQuizDto): Promise<Quiz> {
        if (isEmpty(quizData)) throw new HttpException(400, "QuizData is empty");

        const findContent: Content = await ContentsEntity.findOne({where: {content_id: quizData.content_id}});
        if (!findContent) throw new HttpException(409, "Content doesn't exist");

        const createQuizData: Quiz = await QuizsEntity.create({...quizData, content: findContent});

        return createQuizData;
    }
}

export default QuizsService;