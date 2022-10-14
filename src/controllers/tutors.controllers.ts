import TutorsService from "../services/tutors.service";
import {NextFunction, Request, Response} from "express";
import {Tutor} from "../interfaces/tutors.interface";

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
}

export default TutorsController;