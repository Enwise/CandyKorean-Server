import CoursesService from "../services/courses.service";
import {NextFunction, Request, Response} from "express";
import {Course} from "../interfaces/courses.interface";

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
}

export default CoursesController;