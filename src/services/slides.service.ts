import {Slide} from "../interfaces/slides.interface";
import {AppDataSource} from "../config/data-source";
import {SlidesEntity} from "../entities/slides.entity";

class SlidesService {
    public async findAllSlides(): Promise<Slide[]> {
        const slides: Slide[] = await AppDataSource.getRepository(SlidesEntity).find({});
        return slides;
    }
}

export default SlidesService;