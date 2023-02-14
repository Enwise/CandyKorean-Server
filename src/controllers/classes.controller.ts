import ClassesService from "../services/classes.service";
import {NextFunction, Request, Response} from "express";
import {Class} from "../interfaces/classes.interface";
import {CreateClassesDto} from "../dtos/classes.dto";
import {plainToInstance} from "class-transformer";

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

    public getClassesByCourseId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const courseId = Number(req.params.id);
            const findClassesDataByCourseId: Class[] = await this.classesService.findClassesByCourseId(courseId);

            res.status(200).json({data: findClassesDataByCourseId, message: 'findAll'});
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

    public getClassesCountByCourseId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const courseId = Number(req.params.id);
            const countData: number = await this.classesService.getClassesCountByCourse(courseId);

            res.status(200).json({data: countData, message: 'findOne'});
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
            const classData: CreateClassesDto = plainToInstance(CreateClassesDto, req.body);
            const updateClassData: Class = await this.classesService.updateClass(classId, classData);

            res.status(200).json({data: updateClassData, message: 'updated'});
        } catch (error) {
            next(error)
        }
    }

    public deleteClass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const classId = Number(req.params.id);
            const deleteClassData: Class = await this.classesService.deleteClass(classId);

            res.status(200).json({data: deleteClassData, message: 'deleted'});
        } catch (error) {
            next(error);
        }
    }
}

export default ClassesController;