import TeacherService from "../services/teacher.service";
import {NextFunction, Request, Response} from "express";
import {plainToInstance} from "class-transformer";
import {CreateTeacherDto} from "../dtos/teacher.dto";

class TeacherController {
    public teacherService = new TeacherService();

    public getAllTeachers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllTeachers = await this.teacherService.findAllTeachers();

            res.status(200).json({data: findAllTeachers, message: 'findAll'});
        } catch (error) {
            next(error);
        }
    }

    public getTeacherById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const teacherId = Number(req.params.id);
            const findTeacher = await this.teacherService.findTeacherById(teacherId);

            res.status(200).json({data: findTeacher, message: 'findOne'});
        } catch (error) {
            next(error);
        }
    }

    public createTeacher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const teacherData = plainToInstance(CreateTeacherDto, req.body);
            const createTeacher = await this.teacherService.createTeacher(teacherData);

            res.status(201).json({data: createTeacher, message: 'created'});
        } catch (error) {
            next(error);
        }
    }

    public updateTeacher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const teacherId = Number(req.params.id);
            const teacherData = plainToInstance(CreateTeacherDto, req.body);
            const updateTeacher = await this.teacherService.updateTeacher(teacherId, teacherData);

            res.status(200).json({data: updateTeacher, message: 'updated'});
        } catch (error) {
            next(error);
        }
    }

    public deleteTeacher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const teacherId = Number(req.params.id);
            const deleteTeacher = await this.teacherService.deleteTeacher(teacherId);

            res.status(200).json({data: deleteTeacher, message: 'deleted'});
        } catch (error) {
            next(error);
        }
    }
}

export default TeacherController;