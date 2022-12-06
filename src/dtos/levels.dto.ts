import {IsNumber, IsString, IsBoolean} from "class-validator";
import {Type} from "class-transformer";

export class CreateLevelDto {
    @IsString()
    public name: string;

    @IsString()
    public info: string;

    @Type(()=>Number)
    @IsNumber()
    public tutor_id: number;

    @IsBoolean()
    public enabled: boolean;
}