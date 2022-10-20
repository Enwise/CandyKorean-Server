import {Level} from "../interfaces/levels.interfaces";
import {AppDataSource} from "../config/data-source";
import {LevelEntity} from "../entities/level.entity";

class LevelsService {
    public async findAllLevels(): Promise<Level[]> {
        const levels: Level[] = await AppDataSource.getRepository(LevelEntity).find({})
        return levels
    }
}

export default LevelsService;