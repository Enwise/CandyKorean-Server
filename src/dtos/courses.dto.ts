import {IsNumber, IsString} from "class-validator";

export class CreateCourseDto {
    @IsString()
    public name: string

    @IsNumber()
    public price: number

    @IsString()
    public info: string

    @IsString()
    public category: string

    @IsNumber()
    public view_count: number

    @IsString()
    public level_id: string
}