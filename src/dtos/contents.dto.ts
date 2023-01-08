import {IsBoolean, IsNumber, IsString} from "class-validator";
import {Transform, Type} from "class-transformer";

export class CreateContentDto {
    @IsString()
    public name: string

    @IsString()
    public video_url: string

    @IsString()
    public thumbnail: string

    @Type(()=>Number)
    @IsNumber()
    public view_count: number

    @Type(()=>Number)
    @IsNumber()
    public length: number

    @Type(()=>Number)
    @IsNumber()
    public class_id: number

    @Transform(({ value} ) => value === 'true')
    @IsBoolean()
    public is_portrait: boolean
}