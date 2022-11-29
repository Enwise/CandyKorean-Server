import {IsBoolean, IsNumber, IsString} from "class-validator";

export class CreateLearnedClassDto {
    @IsNumber()
    learn_time: number

    @IsBoolean()
    is_completed: boolean

    @IsNumber()
    user_id: number

    @IsNumber()
    class_id: number
}