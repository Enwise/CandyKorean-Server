import {Tutor} from "../interfaces/tutors.interface";
import {AppDataSource} from "../config/data-source";
import {TutorEntity} from "../entities/tutors.entity";

class TutorsService {
    public async findAllTutors(): Promise<Tutor[]> {
        const tutors: Tutor[] = await AppDataSource.getRepository(TutorEntity).find({
            relations: {user_id: true,}
        })
        return tutors
    }
}

export default TutorsService;