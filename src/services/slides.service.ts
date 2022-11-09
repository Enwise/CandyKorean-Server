import {Slide} from "../interfaces/slides.interface";
import {AppDataSource} from "../config/data-source";
import {SlidesEntity} from "../entities/slides.entity";
import {Class} from "../interfaces/classes.interface";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";
import {ClassesEntity} from "../entities/classes.entity";

class SlidesService {
    public async findAllSlides(): Promise<Slide[]> {
        const slides: Slide[] = await AppDataSource.getRepository(SlidesEntity).find({});
        return slides;
    }

    public async findSlideById(slideId: number): Promise<Slide> {
        if (isEmpty(slideId)) throw new HttpException(400, "slideId is empty");

        const findSlide: Slide = await SlidesEntity.findOne({where: {slide_id: slideId}})
        if (!findSlide) throw new HttpException(409, "Slide doesn't exist");

        return findSlide;
    }
}

export default SlidesService;