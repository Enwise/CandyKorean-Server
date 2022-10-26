import {Course} from "../interfaces/courses.interface";
import {AppDataSource} from "../config/data-source";
import {CoursesEntity} from "../entities/courses.entity";

class CoursesService {
    public async findAllCourses(): Promise<Course[]> {
        const courses: Course[] = await AppDataSource.getRepository(CoursesEntity).find({});
        return courses;
    }
}

export default CoursesService;