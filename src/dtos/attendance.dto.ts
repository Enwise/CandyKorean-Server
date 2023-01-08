import {IsNumber} from "class-validator";
import {Type} from "class-transformer";

export class CreateAttendanceDto {
    @Type(() => Number)
    @IsNumber()
    public user_id: number;
}