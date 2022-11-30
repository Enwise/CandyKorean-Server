import {IsBoolean, IsNumber} from "class-validator";
import {Type} from "class-transformer";

export class CreatePurchasedCourseDto {
    @Type(()=>Number)
    @IsNumber()
    public user_id: number;

    @Type(()=>Number)
    @IsNumber()
    public course_id: number;

    @IsBoolean()
    public is_started: boolean;

    @IsBoolean()
    public is_completed: boolean;
}