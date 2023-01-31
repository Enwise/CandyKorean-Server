import {IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreateTeacherDto {
    @IsString()
    public metaverse_url: string

    @Type(()=>Number)
    @IsNumber()
    public tutor_id: number
}