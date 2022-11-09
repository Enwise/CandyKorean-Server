import SlidesService from "../services/slides.service";
import {NextFunction, Request, Response} from "express";
import {Slide} from "../interfaces/slides.interface";

class SlidesController {
    public slidesService = new SlidesService();

    public getSlides = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllSlidesData: Slide[] = await this.slidesService.findAllSlides();

            res.status(200).json({data: findAllSlidesData, message: 'findAll'});
        } catch (error) {
            next(error);
        }
    }

    public getSlideById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const slideId = Number(req.params.id);
            const findOneSlideData: Slide = await this.slidesService.findSlideById(slideId);

            res.status(200).json({data: findOneSlideData, message: 'findOne'});
        } catch (error) {
            next(error);
        }
    }
}

export default SlidesController;