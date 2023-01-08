import {Slide} from "../interfaces/slides.interface";
import {AppDataSource} from "../config/data-source";
import {SlidesEntity} from "../entities/slides.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";
import {CreateSlideDto} from "../dtos/slides.dto";
import {Content} from "../interfaces/contents.interface";
import {ContentsEntity} from "../entities/contents.entity";

class SlidesService {
    public async findAllSlides(): Promise<Slide[]> {
        const slides: Slide[] = await AppDataSource.getRepository(SlidesEntity).find({relations: {content: true}});
        return slides;
    }

    public async findSlideById(slideId: number): Promise<Slide> {
        if (isEmpty(slideId)) throw new HttpException(400, "slideId is empty");

        const findSlide: Slide = await SlidesEntity.findOne({where: {slide_id: slideId,}, relations: {content: true}})
        if (!findSlide) throw new HttpException(409, "Slide doesn't exist");

        return findSlide;
    }

    public async findSlidesByContentId(contentId: number): Promise<Slide[]> {
        if (isEmpty(contentId)) throw new HttpException(400, "contentId is empty");

        const findSlides: Slide[] = await SlidesEntity.find({where: {content_id: contentId,}, relations: {content: true}})
        if (!findSlides) throw new HttpException(409, "Slide doesn't exist");

        return findSlides;
    }

    public async createSlide(slideData: CreateSlideDto): Promise<Slide> {
        if (isEmpty(slideData)) throw new HttpException(400, "SlideData is empty");

        const findContent: Content = await ContentsEntity.findOne({where: {content_id: slideData.content_id}});
        if (!findContent) throw new HttpException(409, "Content doesn't exist");

        const createSlideData: Slide = await SlidesEntity.create({...slideData, content: findContent}).save();

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

    public async deleteSlide(slideId: number): Promise<Slide> {
        if (isEmpty(slideId)) throw new HttpException(400, "Slide is empty");

        const findSlide: Slide = await SlidesEntity.findOne({where: {slide_id: slideId}});
        if (!findSlide) throw new HttpException(409, "Slide doesn't exist");

        await SlidesEntity.update(slideId, {enabled: false});

        return findSlide;
    }
}

export default SlidesService;