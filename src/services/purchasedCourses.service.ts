import {PurchasedCourse} from "../interfaces/purchasedCourses.interface";
import {AppDataSource} from "../config/data-source";
import {PurchasedCoursesEntity} from "../entities/purchasedCourses.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";
import {CreatePurchasedCourseDto} from "../dtos/purchasedCourses.dto";

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

        const findPurchasedCourses: PurchasedCourse[] = await PurchasedCoursesEntity.find({where: {user_id: userId}});
        if (!findPurchasedCourses) throw new HttpException(409, "PurchasedCourses don't exist");

        return findPurchasedCourses;
    }

    public async createPurchasedCourse(purchasedCourseData: CreatePurchasedCourseDto): Promise<PurchasedCourse> {
        if (isEmpty(purchasedCourseData)) throw new HttpException(400, "PurchasedCourseData is empty");

        const findPurchasedCourse: PurchasedCourse = await PurchasedCoursesEntity.findOne({
            where: {
                user_id: purchasedCourseData.user_id,
                course_id: purchasedCourseData.course_id
            }
        });
        if (findPurchasedCourse) throw new HttpException(409, "This purchasedCourse is already exists");

        const createPurchasedCourseData: PurchasedCourse = await PurchasedCoursesEntity.create({...purchasedCourseData});

        return createPurchasedCourseData;
    }

    public async deletePurchasedCourse(purchasedCourseData: CreatePurchasedCourseDto): Promise<PurchasedCourse> {
        if (isEmpty(purchasedCourseData)) throw new HttpException(400, "PurchasedCourseData is empty");

        const findPurchasedCourse: PurchasedCourse = await PurchasedCoursesEntity.findOne({
            where: {
                user_id: purchasedCourseData.user_id,
                course_id: purchasedCourseData.course_id
            }
        });
        if (!findPurchasedCourse) throw new HttpException(409, "This purchasedCourse doesn't exist");

        await PurchasedCoursesEntity.update({
            user_id: purchasedCourseData.user_id,
            course_id: purchasedCourseData.course_id
        }, {enabled: false})

        return findPurchasedCourse;
    }
}

export default PurchasedCoursesService;