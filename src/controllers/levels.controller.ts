import LevelsService from "../services/levels.service";
import {NextFunction, Request, Response} from "express";
import {Level} from "../interfaces/levels.interfaces";
import {CreateLevelDto} from "../dtos/levels.dto";

class LevelsController {
    public levelService = new LevelsService();

    public getLevels = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllLevelsData: Level[] = await this.levelService.findAllLevels();

            res.status(200).json({data: findAllLevelsData, message: 'findAll'});
        } catch (error) {
            next(error);
        }
    }

    public getLevelById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const levelId = Number(req.params.id);
            const findOneLevelData: Level = await this.levelService.findLevelById(levelId);

            res.status(200).json({data: findOneLevelData, message: 'findOne'});
        } catch (error) {
            next(error);
        }
    }

    public createLevel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const levelData: CreateLevelDto = req.body;
            const createLevelData: Level = await this.levelService.createLevel(levelData);

            res.status(201).json({data: createLevelData, message: 'created'});
        } catch (error) {
            next(error);
        }
    }
}

export default LevelsController;