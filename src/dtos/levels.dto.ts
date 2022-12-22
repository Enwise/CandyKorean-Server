import {IsString, IsBoolean} from "class-validator";
import {Type} from "class-transformer";

export class CreateLevelDto {
    @IsString()
    public name: string;

    @IsString()
    public info: string;

    @Type(()=>Boolean)
    @IsBoolean()
    public enabled: boolean;
}