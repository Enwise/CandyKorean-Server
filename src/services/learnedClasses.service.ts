import {LearnedClasses} from "../interfaces/learnedClasses.interface";
import {AppDataSource} from "../config/data-source";
import {LearnedClassesEntity} from "../entities/learnedClasses.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";
import {CreateLearnedClassDto} from "../dtos/learnedClasses.dto";

class LearnedClassesService{
    public async findAllLearnedClass():Promise<LearnedClasses[]>{
        const learnedClasses: LearnedClasses[] = await AppDataSource.getRepository(LearnedClassesEntity).find({
            relations:{
                user: true,
                class: true
            }
        });
        return learnedClasses;
    }

    public async createLearnedClass(learnedClassData: CreateLearnedClassDto): Promise<LearnedClasses> {
        if (isEmpty(learnedClassData)) throw new HttpException(400, "learnedClassData is empty");

        const findLearnedClass: LearnedClasses = await LearnedClassesEntity.findOne({
            where: {
                user_id: learnedClassData.user_id,
                class_id: learnedClassData.class_id
            }
        });
        if (findLearnedClass) throw new HttpException(409, "This purchasedCourse is already exists");

        const createFindLearnedClassData: LearnedClasses = await LearnedClassesEntity.create({...learnedClassData}).save();

        return createFindLearnedClassData;
    }
}

export default LearnedClassesService;