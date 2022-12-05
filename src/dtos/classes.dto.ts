import {IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreateClassesDto {
    @IsString()
    public name: string

    @Type(()=>Number)
    @IsNumber()
    public course_id: number
}