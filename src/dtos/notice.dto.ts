import {IsString} from "class-validator";

export class CreateNoticeDto {
    @IsString()
    public title: string;

    @IsString()
    public text: string;
}