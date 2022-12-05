import {IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreateLevelDto {
    @IsString()
    public name: string;

    @IsString()
    public info: string;

    @Type(()=>Number)
    @IsNumber()
    public tutor_id: number;
}