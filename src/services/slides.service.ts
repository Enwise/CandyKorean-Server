import {Slide} from "../interfaces/slides.interface";
import {AppDataSource} from "../config/data-source";
import {SlidesEntity} from "../entities/slides.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";
import {CreateSlideDto} from "../dtos/slides.dto";
import {Content} from "../interfaces/contents.interface";
import {ContentsEntity} from "../entities/contents.entity";
import {CreateClassesDto} from "../dtos/classes.dto";
import {Class} from "../interfaces/classes.interface";
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

    public async createSlide(slideData: CreateSlideDto): Promise<Slide> {
        if (isEmpty(slideData)) throw new HttpException(400, "SlideData is empty");

        const findContent: Content = await ContentsEntity.findOne({where: {content_id: slideData.content_id}});
        if (!findContent) throw new HttpException(409, "Content doesn't exist");

        const createSlideData: Slide = await SlidesEntity.create({...slideData, content: findContent});

        return createSlideData;
    }

    public async updateSlide(slideId: number, slideData: CreateSlideDto): Promise<Slide> {
        if (isEmpty(slideId)) throw new HttpException(400, "SlideId is empty");

        const findSlide: Slide = await SlidesEntity.findOne({where: {slide_id: slideId}});
        if (!findSlide) throw new HttpException(409, "Slide doesn't exist");

        await SlidesEntity.update(slideId, {...slideData});

        const updateSlide: Slide = await SlidesEntity.findOne({where: {slide_id: slideId}});

        return updateSlide;
    }

}

export default SlidesService;