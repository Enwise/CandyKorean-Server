import {Level} from "../interfaces/levels.interfaces";
import {AppDataSource} from "../config/data-source";
import {LevelEntity} from "../entities/levels.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";
import {CreateLevelDto} from "../dtos/levels.dto";
import {Teacher} from "../interfaces/teachers.interface";
import {TeacherEntity} from "../entities/teachers.entity";

class LevelsService {
    public async findAllLevels(): Promise<Level[]> {
        const levels: Level[] = await AppDataSource.getRepository(LevelEntity).find();
        return levels
    }

    public async findLevelById(levelId: number) {
        if (isEmpty(levelId)) throw new HttpException(400, "LevelId is empty");

        const findLevel: Level = await LevelEntity.findOne({where: {level_id: levelId}})
        if (!findLevel) throw new HttpException(409, "Level doesn't exist");

        return findLevel;
    }

    public async createLevel(levelData: CreateLevelDto): Promise<Level> {
        if (isEmpty(levelData)) throw new HttpException(400, "LevelData is empty");

        const findLevel: Level = await LevelEntity.findOne({where: {name: levelData.name}});
        if (findLevel) throw new HttpException(409, `this level name ${levelData.name} already exists`);

        const createLevelData: Level = await LevelEntity.create({...levelData}).save();

        return createLevelData;
    }

    public async updateLevel(levelId: number, levelData: CreateLevelDto): Promise<Level> {
        if (isEmpty(levelData)) throw new HttpException(400, "LevelData is empty");

        const findLevel: Level = await LevelEntity.findOne({where: {level_id: levelId}});
        if (!findLevel) throw new HttpException(409, "Level doesn't exist");

        await LevelEntity.update(levelId, {name: levelData.name, info: levelData.info, enabled: levelData.enabled});

        const updateLevel: Level = await LevelEntity.findOne({where: {level_id: levelId}});

        return updateLevel;
    }

    public async deleteLevel(levelId: number): Promise<Level> {
        if (isEmpty(levelId)) throw new HttpException(400, "Level is empty");

        const findLevel: Level = await LevelEntity.findOne({where: {level_id: levelId}});
        if (!findLevel) throw new HttpException(409, "Level doesn't exist");

        await LevelEntity.update(levelId, {enabled: false});

        return findLevel;
    }
}

export default LevelsService;