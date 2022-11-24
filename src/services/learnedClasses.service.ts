import {LearnedClasses} from "../interfaces/learnedClasses.interface";
import {AppDataSource} from "../config/data-source";
import {LearnedClassesEntity} from "../entities/learnedClasses.entity";

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
}

export default LearnedClassesService;