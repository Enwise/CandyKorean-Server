import {Level} from "../interfaces/levels.interfaces";
import {AppDataSource} from "../config/data-source";
import {LevelEntity} from "../entities/level.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";
import {CreateLevelDto} from "../dtos/levels.dto";
import {Tutor} from "../interfaces/tutors.interface";
import {TutorEntity} from "../entities/tutors.entity";

class LevelsService {
    public async findAllLevels(): Promise<Level[]> {
        const levels: Level[] = await AppDataSource.getRepository(LevelEntity).find({})
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

        const findTutor: Tutor = await TutorEntity.findOne({where: {name: levelData.tutor_id}});
        if (findTutor) throw new HttpException(409, "Tutor doesn't exist");

        const createLevelData: Level = await LevelEntity.create({...levelData, tutor: findTutor}).save();

        return createLevelData;
    }

    public async updateLevel(levelId: number, levelData: CreateLevelDto): Promise<Level> {
        if (isEmpty(levelData)) throw new HttpException(400, "LevelData is empty");

        const findLevel: Level = await LevelEntity.findOne({where: {level_id: levelId}});
        if (!findLevel) throw new HttpException(409, "Level doesn't exist");

        await LevelEntity.update(levelId, {...levelData});

        const updateLevel: Level = await LevelEntity.findOne({where: {level_id: levelId}});

        return updateLevel;
    }
}

export default LevelsService;