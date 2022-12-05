import {IsBoolean, IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreateLearnedClassDto {
    @Type(()=>Number)
    @IsNumber()
    learn_time: number

    @IsBoolean()
    is_completed: boolean

    @Type(()=>Number)
    @IsNumber()
    user_id: number

    @Type(()=>Number)
    @IsNumber()
    class_id: number
}