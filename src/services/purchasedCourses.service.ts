import {PurchasedCourse} from "../interfaces/purchased_courses.interface";
import {AppDataSource} from "../config/data-source";
import {PurchasedCoursesEntity} from "../entities/purchasedCourses.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";

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

    public async findPurchasedCourseByUserId(userId: number): Promise<PurchasedCourse[]> {
        if (isEmpty(userId)) throw new HttpException(400, "userId is empty");

        const findPurchasedCourses: PurchasedCourse[] = await PurchasedCoursesEntity.find({where:{user_id:userId}});
        if (!findPurchasedCourses) throw new HttpException(409, "PurchasedCourses don't exist");

        return findPurchasedCourses;
    }
}

export default PurchasedCoursesService;