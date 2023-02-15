import {IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreateAssistantDto {
    @IsString()
    public metaverse_url: string

    @Type(()=>Number)
    @IsNumber()
    public course_id: number

    @IsString()
    public name: string

    @IsString()
    public profile_url: string
}