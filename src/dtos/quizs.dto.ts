import {IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreateQuizDto {
    @IsString()
    public question: string

    @IsString()
    public answer: string

    @Type(()=>Number)
    @IsNumber()
    public content_id: number
}