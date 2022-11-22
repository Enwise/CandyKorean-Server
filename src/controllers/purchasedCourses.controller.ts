import PurchasedCoursesService from "../services/purchasedCourses.service";
import {NextFunction, Request, Response} from "express";
import {PurchasedCourse} from "../interfaces/purchased_courses.interface";

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
}

export default PurchasedCoursesController;