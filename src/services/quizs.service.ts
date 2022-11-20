import {Quiz} from "../interfaces/quizs.interface";
import {AppDataSource} from "../config/data-source";
import {QuizsEntity} from "../entities/quizs.entity";

class QuizsService {
    public async findAllQuizs(): Promise<Quiz[]> {
        const quizs: Quiz[] = await AppDataSource.getRepository(QuizsEntity).find({relations: {content: true}})
        return quizs
    }
}

export default QuizsService;