import {IsBoolean, IsNumber, IsString} from "class-validator";
import {Transform, Type} from "class-transformer";

export class CreateClassesDto {
    @IsString()
    public name: string;

    @Type(() => Number)
    @IsNumber()
    public course_id: number;

    @IsString()
    public thumbnail: string;

    @Type(() => Number)
    @IsNumber()
    public unit: number;

    @Transform(({value}) => value === 'true')
    @IsBoolean()
    public is_metaverse: boolean;
}
