import {Tutor} from "../interfaces/tutors.interface";
import {AppDataSource} from "../config/data-source";
import {TutorEntity} from "../entities/tutors.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";

class TutorsService {
    public async findAllTutors(): Promise<Tutor[]> {
        const tutors: Tutor[] = await AppDataSource.getRepository(TutorEntity).find({
            relations: {user_id: true,}
        })
        return tutors
    }

    public async findTutorById(tutorId:number){
        if(isEmpty(tutorId)) throw new HttpException(400, "TutorId is empty");

        const findTutor:Tutor = await TutorEntity.findOne({where:{tutor_id:tutorId},relations:{user_id:true}})
        if(!findTutor) throw new HttpException(409, "Tutor doesn't exist");

        return findTutor;
    }
}

export default TutorsService;