import {IsBoolean, IsNumber, IsString} from "class-validator";
import {Transform, Type} from "class-transformer";

export class CreateLearnedClassDto {
    @Type(()=>Number)
    @IsNumber()
    learn_time: number

    @Transform(({ value} ) => value === 'true')
    @IsBoolean()
    is_completed: boolean

    @Transform(({ value} ) => value === 'true')
    @IsBoolean()
    is_purchased: boolean

    @Type(()=>Number)
    @IsNumber()
    user_id: number

    @Type(()=>Number)
    @IsNumber()
    class_id: number

    @Type(()=>Number)
    @IsNumber()
    assistant_id: number
}