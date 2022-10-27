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
            relations: {user: true,}
        })
        return tutors
    }

    public async findTutorById(tutorId: number) {
        if (isEmpty(tutorId)) throw new HttpException(400, "TutorId is empty");

        const findTutor: Tutor = await TutorEntity.findOne({where: {tutor_id: tutorId}, relations: {user: true}})
        if (!findTutor) throw new HttpException(409, "Tutor doesn't exist");

        return findTutor;
    }

    public async createTutor(tutorData: CreateTutorDto): Promise<Tutor> {
        if (isEmpty(tutorData)) throw new HttpException(400, "TutorData is empty");

        const findTutor: Tutor = await TutorEntity.findOne({where: {name: tutorData.name}});
        if (!findTutor) throw new HttpException(409, `This tutor name ${tutorData.name} already exists`);

        const findUser: User = await UserEntity.findOne({where: {user_id: Number(tutorData.user_id)}});
        if (!findUser) throw new HttpException(409, "User doesn't exist");

        const createTutorData: Tutor = await TutorEntity.create({...tutorData, user: findUser}).save();

        return createTutorData;
    }

    public async updateTutor(tutorId: number, tutorData: CreateTutorDto): Promise<Tutor> {
        if (isEmpty(tutorData)) throw new HttpException(400, "TutorData is empty");

        const findTutor: Tutor = await TutorEntity.findOne({where: {tutor_id: tutorId}});
        if (!findTutor) throw new HttpException(409, "Tutor doesn't exist");

        await TutorEntity.update(tutorId, {...tutorData})

        const updateTutor: Tutor = await TutorEntity.findOne({where: {tutor_id: tutorId}});
        return updateTutor;
    }

    public async deleteTutor(tutorId: number): Promise<Tutor> {
        if (isEmpty(tutorId)) throw new HttpException(400, "TutorId is empty");

        const findTutor: Tutor = await  TutorEntity.findOne({where: {tutor_id:tutorId}});
        if (!findTutor) throw new HttpException(409, "Tutor doesn't exist");

        await TutorEntity.update(tutorId,{enabled: true});
        return findTutor;
    }
}

export default TutorsService;