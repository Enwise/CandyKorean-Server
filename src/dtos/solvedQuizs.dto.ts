import {IsBoolean, IsNumber} from "class-validator";
import {Type} from "class-transformer";

export class CreateSolvedQuizDto{
    @Type(()=>Number)
    @IsNumber()
    user_id: number

    @Type(()=>Number)
    @IsNumber()
    quiz_id: number

    @Type(()=>Boolean)
    @IsBoolean()
    is_correct: boolean
}