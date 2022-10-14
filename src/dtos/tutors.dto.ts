import {IsString} from "class-validator";

export class CreateTutorDto {
    @IsString()
    public user_id: string;

    @IsString()
    public name: string;
}