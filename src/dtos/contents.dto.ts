import {IsNumber, IsString} from "class-validator";

export class CreateContentDto {
    @IsString()
    public name: string

    @IsString()
    public video_url: string

    @IsString()
    public thumbnail: string

    @IsNumber()
    public view_count: number

    @IsNumber()
    public length: number

    @IsNumber()
    public class_id: number
}