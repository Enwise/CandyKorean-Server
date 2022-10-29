import {IsNumber, IsString} from "class-validator";

export class CreateClassesDto {
    @IsString()
    public name: string

    @IsNumber()
    public course_id: number
}