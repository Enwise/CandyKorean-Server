import ClassesService from "../services/classes.service";
import {NextFunction, Request, Response} from "express";
import {Class} from "../interfaces/classes.interface";

class ClassesController {
    public classesService = new ClassesService();

    public getClasses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllClassesData: Class[] = await this.classesService.findAllClasses();

            res.status(200).json({data:findAllClassesData, message:'findAll'});
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
}

export default ClassesController;