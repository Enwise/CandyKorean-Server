import CoursesService from "../services/courses.service";
import {NextFunction, Request, Response} from "express";
import {Course} from "../interfaces/courses.interface";
import {CreateCourseDto} from "../dtos/courses.dto";

class CoursesController {
    public courseService = new CoursesService();

    public getCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllCoursesData: Course[] = await this.courseService.findAllCourses();

            res.status(200).json({data:findAllCoursesData, message:'findAll'});
        } catch (error) {
            next(error)
        }
    }

    public getCourseById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const courseId = Number(req.params.id);
            const findOneCourseData: Course = await this.courseService.findCourseById(courseId);

            res.status(200).json({data: findOneCourseData, message: 'findOne'});
        } catch (error) {
            next(error);
        }
    }

    public createCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const courseData: CreateCourseDto = req.body;
            const createCourseData: Course = await this.courseService.createCourse(courseData);

            res.status(201).json({data: createCourseData, message: 'created'});
        } catch (error) {
            next(error);
        }
    }
}

export default CoursesController;