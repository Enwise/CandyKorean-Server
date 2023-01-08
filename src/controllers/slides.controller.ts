import SlidesService from "../services/slides.service";
import {NextFunction, Request, Response} from "express";
import {Slide} from "../interfaces/slides.interface";
import {CreateSlideDto} from "../dtos/slides.dto";

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

    public getSlidesByContentId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const contentId = Number(req.params.id);
            const findSlidesData: Slide[] = await this.slidesService.findSlidesByContentId(contentId);

            res.status(200).json({data: findSlidesData, message: 'findAll'});
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

    public createSlide = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const slideData: CreateSlideDto = req.body;
            const createSlideData: Slide = await this.slidesService.createSlide(slideData);

            res.status(201).json({data: createSlideData, message: 'created'});
        } catch (error) {
            next(error);
        }
    }

    public updateSlide = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const slideId = Number(req.params.id);
            const slideData: CreateSlideDto = req.body;
            const updateSlideData: Slide = await this.slidesService.updateSlide(slideId, slideData);

            res.status(200).json({data: updateSlideData, message: 'updated'});
        } catch (error) {
            next(error)
        }
    }

    public deleteSlide = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const slideId = Number(req.params.id);
            const deleteSlideData: Slide = await this.slidesService.deleteSlide(slideId);

            res.status(200).json({data: deleteSlideData, message: 'deleted'});
        } catch (error) {
            next(error);
        }
    }
}

export default SlidesController;