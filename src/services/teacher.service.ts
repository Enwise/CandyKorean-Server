import {AppDataSource} from "../config/data-source";
import TeacherEntity from "../entities/teacher.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";
import {CreateTeacherDto} from "../dtos/teacher.dto";
import {TutorEntity} from "../entities/tutors.entity";
import {Teacher} from "../interfaces/teacher.interface";

class TeacherService {
    public async findAllTeachers(): Promise<Teacher[]> {
        const teachers: Teacher[] = await AppDataSource.getRepository(TeacherEntity).find();
        return teachers;
    }

    public async findTeacherById(teacherId: number): Promise<Teacher> {
        if (isEmpty(teacherId)) throw new HttpException(400, "teacherId is empty");
        const findTeacher = await TeacherEntity.findOne({where: {teacher_id: teacherId}, relations: {tutor: true}});

        if (!findTeacher) throw new HttpException(409, "Teacher doesn't exist");
        return findTeacher;
    }

    public async createTeacher(teacherData: CreateTeacherDto): Promise<Teacher> {
        if (isEmpty(teacherData)) throw new HttpException(400, "teacherData is empty");

        const findTutor = await TutorEntity.findOne({where: {tutor_id: teacherData.tutor_id}});
        if (!findTutor) throw new HttpException(409, "Tutor doesn't exist");

        const createTeacherData: Teacher = await TeacherEntity.create({...teacherData}).save();
        return createTeacherData;
    }

    public async updateTeacher(teacherId: number, teacherData: CreateTeacherDto): Promise<Teacher> {
        if (isEmpty(teacherId)) throw new HttpException(400, "teacherId is empty");
        if (isEmpty(teacherData)) throw new HttpException(400, "teacherData is empty");

        const findTeacher = await TeacherEntity.findOne({where: {teacher_id: teacherId}, relations: {tutor: true}});
        if (!findTeacher) throw new HttpException(409, "Teacher doesn't exist");

        await TeacherEntity.update(teacherId, {...teacherData});

        const updateTeacherData: Teacher = await TeacherEntity.findOne({
            where: {teacher_id: teacherId},
            relations: {tutor: true}
        });
        return updateTeacherData;
    }

    public async deleteTeacher(teacherId: number): Promise<Teacher> {
        if (isEmpty(teacherId)) throw new HttpException(400, "teacherId is empty");

        const findTeacher = await TeacherEntity.findOne({where: {teacher_id: teacherId}, relations: {tutor: true}});
        if (!findTeacher) throw new HttpException(409, "Teacher doesn't exist");

        await TeacherEntity.delete(teacherId);
        return findTeacher;
    }
}

export default TeacherService;