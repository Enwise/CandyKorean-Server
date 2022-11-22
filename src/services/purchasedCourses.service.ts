import {PurchasedCourse} from "../interfaces/purchased_courses.interface";
import {AppDataSource} from "../config/data-source";
import {PurchasedCoursesEntity} from "../entities/purchasedCourses.entity";

class PurchasedCoursesService {
    public async findAllPurchasedCourse(): Promise<PurchasedCourse[]> {
        const purchasedCourses: PurchasedCourse[] = await AppDataSource.getRepository(PurchasedCoursesEntity).find({
            relations: {
                user: true,
                course: true
            }
        });
        return purchasedCourses;
    }
}

export default PurchasedCoursesService;