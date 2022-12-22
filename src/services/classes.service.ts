import {Class} from "../interfaces/classes.interface";
import {AppDataSource} from "../config/data-source";
import {ClassesEntity} from "../entities/classes.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";
import {CreateClassesDto} from "../dtos/classes.dto";
import {Course} from "../interfaces/courses.interface";
import {CourseEntity} from "../entities/courses.entity";

class ClassesService {
    public async findAllClasses(): Promise<Class[]> {
        const classes: Class[] = await AppDataSource.getRepository(ClassesEntity).find({relations: {course: true}});
        return classes;
    }

    public async findClassesById(classId: number): Promise<Class> {
        if (isEmpty(classId)) throw new HttpException(400, "classId is empty");

        const findClass: Class = await ClassesEntity.findOne({where: {class_id: classId}, relations: {course: true}})
        if (!findClass) throw new HttpException(409, "Class doesn't exist");

        return findClass;
    }

    public async createClass(classData: CreateClassesDto): Promise<Class> {
        if (isEmpty(classData)) throw new HttpException(400, "ClassData is empty");

        const findClass: Class = await ClassesEntity.findOne({where: {name: classData.name}});
        if (findClass) throw new HttpException(409, `this class name ${classData.name} already exists`);

        const findCourse: Course = await CourseEntity.findOne({where: {course_id: classData.course_id}});
        if (!findCourse) throw new HttpException(409, "Course doesn't exist");

        const createClassesData: Class = await ClassesEntity.create({...classData, course: findCourse}).save();

        return createClassesData;
    }

    public async updateClass(classId: number, classData: CreateClassesDto): Promise<Class> {
        if (isEmpty(classId)) throw new HttpException(400, "Class is empty");

        const findClass: Class = await ClassesEntity.findOne({where: {class_id: classId}});
        if (!findClass) throw new HttpException(409, "Class doesn't exist");

        const findCourse: Course = await CourseEntity.findOne({where: {course_id: classData.course_id}});
        if (!findCourse) throw new HttpException(409, "Course doesn't exist");

        await ClassesEntity.update(classId, {name:classData.name, course_id: classData.course_id});

        const updateClass: Class = await ClassesEntity.findOne({where: {class_id: classId}});

        return updateClass;
    }

    public async deleteClass(classId: number): Promise<Class> {
        if (isEmpty(classId)) throw new HttpException(400, "Class is empty");

        const findClass: Class = await ClassesEntity.findOne({where: {class_id: classId}});
        if (!findClass) throw new HttpException(409, "Class doesn't exist");

        await CourseEntity.delete(classId);

        return findClass;
    }
}

export default ClassesService;