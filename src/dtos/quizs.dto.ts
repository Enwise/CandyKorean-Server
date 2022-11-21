import {IsNumber, IsString} from "class-validator";

export class CreateQuizDto {
    @IsString()
    public question: string

    @IsString()
    public answer: string

    @IsNumber()
    public content_id: number
}