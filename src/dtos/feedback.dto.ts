import {IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreateFeedbackDto {
    @IsString()
    public category: string;

    @IsString()
    public text: string;

    @Type(()=>Number)
    @IsNumber()
    public user_id: number;
}