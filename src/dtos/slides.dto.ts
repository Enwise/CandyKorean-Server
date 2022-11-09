import {IsBoolean, IsNumber, IsString} from "class-validator";

export class CreateSlideDto {
    @IsNumber()
    public display_time: number

    @IsBoolean()
    public enabled: boolean

    @IsString()
    public img_url: string

    @IsNumber()
    public view_count: number

    @IsNumber()
    public content_id: number
}