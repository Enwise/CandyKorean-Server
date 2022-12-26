import {IsBoolean, IsNumber} from "class-validator";
import {Type} from "class-transformer";

export class CreateWishlistDto{
    @Type(()=>Boolean)
    @IsBoolean()
    public checked: boolean

    @Type(()=>Number)
    @IsNumber()
    public user_id: number

    @Type(()=>Number)
    @IsNumber()
    public course_id: number
}