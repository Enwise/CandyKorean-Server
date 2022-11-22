import PurchasedCoursesService from "../services/purchasedCourses.service";
import {NextFunction, Request, Response} from "express";
import {PurchasedCourse} from "../interfaces/purchased_courses.interface";
import {CreatePurchasedCourseDto} from "../dtos/purchasedCourses.dto";

class PurchasedCoursesController {
    public purchasedCoursesService = new PurchasedCoursesService();

    public getPurchasedCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllPurchasedCoursesData: PurchasedCourse[] = await this.purchasedCoursesService.findAllPurchasedCourse();

            res.status(200).json({data: findAllPurchasedCoursesData, message: 'findAll'});
        } catch (error) {
            next(error);
        }
    }

    public getPurchasedCourseByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = Number(req.params.id);
            const findPurchasedCoursesData: PurchasedCourse[] = await this.purchasedCoursesService.findPurchasedCourseByUserId(userId);
            res.status(200).json({data: findPurchasedCoursesData, message: 'findByUserId'});
        } catch (error) {
            next(error);
        }
    }

    public createPurchasedCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const purchasedCourseData: CreatePurchasedCourseDto = req.body;
            const createPurchasedCourseData: PurchasedCourse = await this.purchasedCoursesService.createPurchasedCourse(purchasedCourseData);

            res.status(201).json({data: createPurchasedCourseData, message: 'created'});
        } catch (error) {
            next(error);
        }
    }

    public deletePurchasedCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const purchasedCourseData: CreatePurchasedCourseDto = req.body;
            const deletePurchasedCourseData: PurchasedCourse = await this.purchasedCoursesService.deletePurchasedCourse(purchasedCourseData);

            res.status(200).json({data: deletePurchasedCourseData, message: 'deleted'});
        } catch (error) {
            next(error);
        }
    }
}

export default PurchasedCoursesController;