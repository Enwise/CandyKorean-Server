import { IsArray, IsDate, IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  public name: string;

  @IsEmail()
  public login_id: string;

  @IsString()
  public password: string;

  @IsString()
  public nickname: string;

  @IsString()
  public nationality: string;

  @IsString()
  public korean_level: string;

  @IsString()
  public job: string;

  @IsString()
  public gender: string;

  @IsDate()
  public date_of_birth: Date;

  @IsArray()
  public survey1_answer: string[];

  @IsArray()
  public survey2_answer: string[];

  @IsArray()
  public survey3_answer: string[];
}
