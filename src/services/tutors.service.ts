import {Tutor} from "../interfaces/tutors.interface";
import {AppDataSource} from "../config/data-source";
import {TutorEntity} from "../entities/tutors.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";
import {CreateTutorDto} from "../dtos/tutors.dto";
import {User} from "../interfaces/users.interface";
import {UserEntity} from "../entities/users.entity";

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

    public async createTutor(tutorData: CreateTutorDto): Promise<Tutor> {
        if (isEmpty(tutorData)) throw new HttpException(400, "TutorData is empty");

        const findTutor: Tutor = await TutorEntity.findOne({where: {name:tutorData.name}});
        if (findTutor) throw new HttpException(409, `This tutor name ${tutorData.name} already exists`);

        const findUser: User = await UserEntity.findOne({where: {user_id: Number(tutorData.user_id)}});
        const createTutorData: Tutor = await TutorEntity.create({...tutorData,user_id:findUser});

        return createTutorData
    }
}

export default TutorsService;