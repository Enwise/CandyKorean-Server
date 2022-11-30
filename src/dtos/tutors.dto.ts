import {IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreateTutorDto {
    @Type(()=>Number)
    @IsNumber()
    public user_id: number;

    @IsString()
    public name: string;

    @IsString()
    public img_url: string;

    @IsString()
    public profile_url: string;
}