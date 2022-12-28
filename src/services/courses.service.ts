import {TutorEntity} from './../entities/tutors.entity';
import {Tutor} from '../interfaces/tutors.interface';
import {Course} from "../interfaces/courses.interface";
import {AppDataSource} from "../config/data-source";
import {CourseEntity} from "../entities/courses.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";
import {CreateCourseDto} from "../dtos/courses.dto";
import {Level} from "../interfaces/levels.interfaces";
import {LevelEntity} from "../entities/levels.entity";

class CoursesService {
    public async findAllCourses(): Promise<Course[]> {
        const courses: Course[] = await AppDataSource.getRepository(CourseEntity).find({
            relations: {
                level: true,
                tutor: true
            }, where: {is_premium: false}
        });
        return courses;
    }

    public async findPremiumCourses(): Promise<Course[]> {
        const courses: Course[] = await AppDataSource.getRepository(CourseEntity).find({
            relations: {
                level: true,
                tutor: true
            }, where: {is_premium: true}
        });
        return courses;
    }

    public async findCourseById(courseId: number) {
        if (isEmpty(courseId)) throw new HttpException(400, "courseId is empty");

        const findCourse: Course = await CourseEntity.findOne({where: {course_id: courseId}})
        if (!findCourse) throw new HttpException(409, "Course doesn't exist");

        return findCourse;
    }

    public async createCourse(courseData: CreateCourseDto): Promise<Course> {
        if (isEmpty(courseData)) throw new HttpException(400, "CourseData is empty");

        const findCourse: Course = await CourseEntity.findOne({where: {name: courseData.name}});
        if (findCourse) throw new HttpException(409, `this course name ${courseData.name} already exists`);

        const findLevel: Level = await LevelEntity.findOne({where: {level_id: Number(courseData.level_id)}});
        if (!findLevel) throw new HttpException(409, "Level doesn't exist");

        const findTutor: Tutor = await TutorEntity.findOne({where: {tutor_id: Number(courseData.tutor_id)}});
        if (!findTutor) throw new HttpException(409, "Tutor doesn't exist");

        const createCourseData: Course = await CourseEntity.create({
            ...courseData,
            level: findLevel,
            tutor: findTutor
        }).save();

        return createCourseData;
    }

    public async updateCourse(courseId: number, courseData: CreateCourseDto): Promise<Course> {
        if (isEmpty(courseId)) throw new HttpException(400, "CourseData is emtpy");

        const findCourse: Course = await CourseEntity.findOne({where: {course_id: courseId}});
        if (!findCourse) throw new HttpException(409, "Course doesn't exist");

        const findLevel: Level = await LevelEntity.findOne({where: {level_id: courseData.level_id}});
        if (!findLevel) throw new HttpException(409, "Level doesn't exist");

        const findTutor: Tutor = await TutorEntity.findOne({where: {tutor_id: courseData.tutor_id}});
        if (!findTutor) throw new HttpException(409, "Tutor doesn't exist");

        await CourseEntity.update(courseId, {...courseData});

        const updateCourse: Course = await CourseEntity.findOne({where: {course_id: courseId}});

        return updateCourse;
    }

    public async deleteCourse(courseId: number): Promise<Course> {
        if (isEmpty(courseId)) throw new HttpException(400, "Course is empty");

        const findCourse: Course = await CourseEntity.findOne({where: {course_id: courseId}});
        if (!findCourse) throw new HttpException(409, "Course doesn't exist");

        await CourseEntity.delete(courseId);

        return findCourse;
    }
}

export default CoursesService;