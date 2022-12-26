import {IsBoolean, IsNumber} from "class-validator";
import {Transform, Type} from "class-transformer";

export class CreateSolvedQuizDto{
    @Type(()=>Number)
    @IsNumber()
    user_id: number

    @Type(()=>Number)
    @IsNumber()
    quiz_id: number

    @IsBoolean()
    @Transform(({ value} ) => value === 'true')
    is_correct: boolean
}