import {IsString} from "class-validator";

export class CreateLevelDto {
    @IsString()
    public name: string;

    @IsString()
    public info: string;

    @IsString()
    public tutor_id: string;
}