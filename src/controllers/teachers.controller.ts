import TeachersService from "../services/teachers.service";
import {NextFunction, Request, Response} from "express";
import {Teacher} from "../interfaces/teachers.interface";
import {CreateTeacherDto} from "../dtos/teachers.dto";

class TeachersController {
    public tutorService = new TeachersService;

    public getTutors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllTutorsData: Teacher[] = await this.tutorService.findAllTeachers();

            res.status(200).json({data: findAllTutorsData, message: 'findAll'});
        } catch (error) {
            next(error);
        }
    }

    public getTutorById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const tutorId = Number(req.params.id);
            const findOneTutorData: Teacher = await this.tutorService.findTeacherById(tutorId);

            res.status(200).json({data: findOneTutorData, message: 'findOne'});
        } catch (error) {
            next(error);
        }
    }

    public createTutor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const tutorData: CreateTeacherDto = req.body;
            const createTutorData: Teacher = await this.tutorService.createTeacher(tutorData);

            res.status(201).json({data: createTutorData, message: 'created'});
        } catch (error) {
            next(error);
        }
    }

    public updateTutor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const tutorId = Number(req.params.id);
            const tutorData: CreateTeacherDto = req.body;
            const updateTutorData: Teacher = await this.tutorService.updateTutor(tutorId, tutorData);

            res.status(200).json({data: updateTutorData, message: 'updated'});
        } catch (error) {
            next(error);
        }
    }

    public deleteTutor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const tutorId = Number(req.params.id);
            const deleteTutorData: Teacher = await this.tutorService.deleteTutor(tutorId);

            res.status(200).json({data: deleteTutorData, message: 'deleted'});
        } catch (error) {
            next(error)
        }
    }
}

export default TeachersController;