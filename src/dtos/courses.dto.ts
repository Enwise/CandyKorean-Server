import {IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreateCourseDto {
    @IsString()
    public name: string

    @Type(()=>Number)
    @IsNumber()
    public price: number

    @IsString()
    public info: string

    @IsString()
    public category: string

    @Type(()=>Number)
    @IsNumber()
    public view_count: number

    @Type(()=>Boolean)
    @IsNumber()
    public is_wishlist: boolean

    @IsString()
    public level_id: string

    @IsString()
    public tutor_id: string
}