import {Level} from "../interfaces/levels.interfaces";
import {AppDataSource} from "../config/data-source";
import {LevelEntity} from "../entities/level.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";

class LevelsService {
    public async findAllLevels(): Promise<Level[]> {
        const levels: Level[] = await AppDataSource.getRepository(LevelEntity).find({})
        return levels
    }

    public async findLevelById(levelId: number){
        if (isEmpty(levelId)) throw new HttpException(400, "LevelId is empty");

        const findLevel: Level = await LevelEntity.findOne({where:{level_id:levelId}})
        if (!findLevel) throw new HttpException(409, "Level doesn't exist");

        return findLevel;
    }
}

export default LevelsService;