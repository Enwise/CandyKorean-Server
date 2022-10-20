import LevelsService from "../services/levels.service";
import {NextFunction, Request, Response} from "express";
import {Level} from "../interfaces/levels.interfaces";

class LevelsController {
    public levelService = new LevelsService();

    public getLevels = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllLevelsData: Level[] = await this.levelService.findAllLevels();

            res.status(200).json({data: findAllLevelsData, message:'findAll'});
        } catch (error) {
            next(error);
        }
    }
}

export default LevelsController;