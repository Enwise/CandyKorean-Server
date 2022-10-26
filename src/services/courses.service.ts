import {Course} from "../interfaces/courses.interface";
import {AppDataSource} from "../config/data-source";
import {CoursesEntity} from "../entities/courses.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";

class CoursesService {
    public async findAllCourses(): Promise<Course[]> {
        const courses: Course[] = await AppDataSource.getRepository(CoursesEntity).find({});
        return courses;
    }

    public async findCourseById(courseId: number) {
        if (isEmpty(courseId)) throw new HttpException(400, "courseId is empty");

        const findCourse: Course = await CoursesEntity.findOne({where: {course_id: courseId}})
        if (!findCourse) throw new HttpException(409, "Course doesn't exist");

        return findCourse;
    }
}

export default CoursesService;