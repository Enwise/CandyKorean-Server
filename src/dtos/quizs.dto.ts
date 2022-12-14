import {IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreateQuizDto {
    @IsString()
    public style: string

    @IsString()
    public json: string

    @Type(()=>Number)
    @IsNumber()
    public content_id: number
}