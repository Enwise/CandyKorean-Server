import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    public name: string;

    @IsEmail()
    public login_id: string;

    @IsString()
    public password: string;

    @IsString()
    public nickname: string;
}