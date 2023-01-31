import TutorsService from "../services/tutors.service";
import {NextFunction, Request, Response} from "express";
import {Tutor} from "../interfaces/tutors.interface";
import {CreateTutorDto} from "../dtos/tutors.dto";

class TutorsController {
    public tutorService = new TutorsService;

    public getTutors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllTutorsData: Tutor[] = await this.tutorService.findAllTutors();

            res.status(200).json({data: findAllTutorsData, message: 'findAll'});
        } catch (error) {
            next(error);
        }
    }

    public getTutorById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const tutorId = Number(req.params.id);
            const findOneTutorData: Tutor = await this.tutorService.findTutorById(tutorId);

            res.status(200).json({data: findOneTutorData, message: 'findOne'});
        } catch (error) {
            next(error);
        }
    }

    public createTutor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const tutorData: CreateTutorDto = req.body;
            const createTutorData: Tutor = await this.tutorService.createTutor(tutorData);

            res.status(201).json({data: createTutorData, message: 'created'});
        } catch (error) {
            next(error);
        }
    }

    public updateTutor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const tutorId = Number(req.params.id);
            const tutorData: CreateTutorDto = req.body;
            const updateTutorData: Tutor = await this.tutorService.updateTutor(tutorId, tutorData);

            res.status(200).json({data: updateTutorData, message: 'updated'});
        } catch (error) {
            next(error);
        }
    }

    public deleteTutor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const tutorId = Number(req.params.id);
            const deleteTutorData: Tutor = await this.tutorService.deleteTutor(tutorId);

            res.status(200).json({data: deleteTutorData, message: 'deleted'});
        } catch (error) {
            next(error)
        }
    }
}

export default TutorsController;