import ClassesService from "../services/classes.service";
import {NextFunction, Request, Response} from "express";
import {Class} from "../interfaces/classes.interface";
import {CreateClassesDto} from "../dtos/classes.dto";
import {CreateCourseDto} from "../dtos/courses.dto";
import {Course} from "../interfaces/courses.interface";

class ClassesController {
    public classesService = new ClassesService();

    public getClasses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllClassesData: Class[] = await this.classesService.findAllClasses();

            res.status(200).json({data: findAllClassesData, message: 'findAll'});
        } catch (error) {
            next(error);
        }
    }

    public getClassById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const classId = Number(req.params.id);
            const findOneClassData: Class = await this.classesService.findClassesById(classId);

            res.status(200).json({data: findOneClassData, message: 'findOne'});
        } catch (error) {
            next(error);
        }
    }

    public createClass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const classData: CreateClassesDto = req.body;
            const createClassData: Class = await this.classesService.createClass(classData);

            res.status(201).json({data: createClassData, message: 'created'});
        } catch (error) {
            next(error);
        }
    }

    public updateClass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const classId = Number(req.params.id);
            const classData: CreateClassesDto = req.body;
            const updateClassData: Class = await this.classesService.updateClass(classId, classData);

            res.status(200).json({data: updateClassData, message: 'updated'});
        } catch (error) {
            next(error)
        }
    }
}

export default ClassesController;