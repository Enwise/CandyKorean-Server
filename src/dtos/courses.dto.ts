import {IsNumber, IsString} from "class-validator";

export class CreateCourseDto {
    @IsString()
    public name: string

    @IsString()
    public price: number

    @IsString()
    public info: string

    @IsString()
    public category: string

    @IsString()
    public view_count: number

    @IsString()
    public level_id: string
}