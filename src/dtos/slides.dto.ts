import {IsBoolean, IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreateSlideDto {
    @Type(()=>Number)
    @IsNumber()
    public display_time: number

    @IsBoolean()
    public enabled: boolean

    @IsString()
    public img_url: string

    @Type(()=>Number)
    @IsNumber()
    public view_count: number

    @Type(()=>Number)
    @IsNumber()
    public content_id: number
}