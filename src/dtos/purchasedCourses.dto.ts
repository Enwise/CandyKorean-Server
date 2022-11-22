import {IsBoolean, IsNumber} from "class-validator";

export class CreatePurchasedCourseDto {
    @IsNumber()
    public user_id: number;

    @IsNumber()
    public course_id: number;

    @IsBoolean()
    public is_started: boolean;

    @IsBoolean()
    public is_completed: boolean;
}