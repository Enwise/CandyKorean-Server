import { IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

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

  @Type(() => Number)
  @IsNumber()
  public total_unit: number;


}
