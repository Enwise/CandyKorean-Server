import {IsBoolean, IsNumber, IsString} from "class-validator";
import {Transform, Type} from "class-transformer";

export class CreateCourseDto {
  @IsString()
  public name: string;

  @Type(() => Number)
  @IsNumber()
  public price: number;

  @IsString()
  public info: string;

  @IsString()
  public category: string;

  @Type(() => Number)
  @IsNumber()
  public view_count: number;

  @Type(() => Number)
  @IsNumber()
  public level_id: number;

  @Type(() => Number)
  @IsNumber()
  public tutor_id: number;

  @IsString()
  public thumbnail: string;

  @Transform(({ value} ) => value === 'true')
  @IsBoolean()
  is_premium: boolean
}
