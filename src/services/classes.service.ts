import {Class} from "../interfaces/classes.interface";
import {AppDataSource} from "../config/data-source";
import {ClassesEntity} from "../entities/classes.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";

class ClassesService {
    public async findAllClasses(): Promise<Class[]>{
        const classes: Class[] = await AppDataSource.getRepository(ClassesEntity).find({});
        return classes;
    }

    public async findClassesById(classId: number): Promise<Class>{
        if (isEmpty(classId)) throw new HttpException(400, "classId is empty");

        const findClass: Class = await ClassesEntity.findOne({where: {class_id: classId}})
        if (!findClass) throw new HttpException(409, "Class doesn't exist");

        return findClass;
    }
}

export default ClassesService;