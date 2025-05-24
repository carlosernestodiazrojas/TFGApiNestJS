import { IsEmail, IsNotEmpty } from 'class-validator';
import { LoginDtoInterface } from 'src/domain/dto-interfaces/users/login.dto-interface';

export class LoginDto implements LoginDtoInterface {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}