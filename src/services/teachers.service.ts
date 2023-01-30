import {Teacher} from "../interfaces/teachers.interface";
import {AppDataSource} from "../config/data-source";
import {TeacherEntity} from "../entities/teachers.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";
import {CreateTeacherDto} from "../dtos/teachers.dto";
import {User} from "../interfaces/users.interface";
import {UserEntity} from "../entities/users.entity";

class TeachersService {
    public async findAllTeachers(): Promise<Teacher[]> {
        const teachers: Teacher[] = await AppDataSource.getRepository(TeacherEntity).find({
            relations: {user: true,}
        })
        return teachers
    }

    public async findTeacherById(teacherId: number) {
        if (isEmpty(teacherId)) throw new HttpException(400, "TutorId is empty");

        const findTutor: Teacher = await TeacherEntity.findOne({where: {tutor_id: teacherId}, relations: {user: true}})
        if (!findTutor) throw new HttpException(409, "Tutor doesn't exist");

        return findTutor;
    }

    public async createTeacher(tutorData: CreateTeacherDto): Promise<Teacher> {
        if (isEmpty(tutorData)) throw new HttpException(400, "TutorData is empty");

        const findTutor: Teacher = await TeacherEntity.findOne({where: {name: tutorData.name}});
        if (findTutor) throw new HttpException(409, `This tutor name ${tutorData.name} already exists`);

        const findUser: User = await UserEntity.findOne({where: {user_id: Number(tutorData.user_id)}});
        if (!findUser) throw new HttpException(409, "User doesn't exist");

        const createTutorData: Teacher = await TeacherEntity.create({...tutorData, user: findUser}).save();

        return createTutorData;
    }

    public async updateTutor(tutorId: number, tutorData: CreateTeacherDto): Promise<Teacher> {
        if (isEmpty(tutorData)) throw new HttpException(400, "TutorData is empty");

        const findTutor: Teacher = await TeacherEntity.findOne({where: {tutor_id: tutorId}});
        if (!findTutor) throw new HttpException(409, "Tutor doesn't exist");

        const findUser: User = await UserEntity.findOne({where: {user_id: Number(tutorData.user_id)}});
        if (!findUser) throw new HttpException(409, "User doesn't exist");

        await TeacherEntity.update(tutorId, {name:tutorData.name, user:findUser, img_url: tutorData.img_url, profile_url : tutorData.profile_url, introduction: tutorData.introduction})

        const updateTutor: Teacher = await TeacherEntity.findOne({where: {tutor_id: tutorId}});
        return updateTutor;
    }

    public async deleteTutor(tutorId: number): Promise<Teacher> {
        if (isEmpty(tutorId)) throw new HttpException(400, "TutorId is empty");

        const findTutor: Teacher = await  TeacherEntity.findOne({where: {tutor_id:tutorId}});
        if (!findTutor) throw new HttpException(409, "Tutor doesn't exist");

        await TeacherEntity.update(tutorId,{enabled: false});

        const deleteTutor: Teacher = await  TeacherEntity.findOne({where: {tutor_id:tutorId}});
        return deleteTutor;
    }
}

export default TeachersService;