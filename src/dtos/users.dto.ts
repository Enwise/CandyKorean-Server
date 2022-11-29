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

  @IsString()
  public date_of_birth: string;

  @IsString()
  public survey_answers: string;
}
