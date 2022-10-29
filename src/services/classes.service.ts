import {Class} from "../interfaces/classes.interface";
import {AppDataSource} from "../config/data-source";
import {ClassesEntity} from "../entities/classes.entity";

class ClassesService {
    public async findAllClasses(): Promise<Class[]>{
        const classes: Class[] = await AppDataSource.getRepository(ClassesEntity).find({});
        return classes;
    }
}

export default ClassesService;