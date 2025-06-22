import { IsEmail, IsNotEmpty } from 'class-validator';
import { ILoginDto } from 'src/application/dto-interfaces/users/login.dto-interface';

export class LoginDto implements ILoginDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}