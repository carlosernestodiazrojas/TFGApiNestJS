import { IsNotEmpty, MinLength } from 'class-validator';
import { IChangePasswordDto } from 'src/application/dto-interfaces/users/change-password.dto-interface';

export class ChangePasswordDto implements IChangePasswordDto {

    @IsNotEmpty()
    @MinLength(6)
    oldPass: string;

    @IsNotEmpty()
    @MinLength(6)
    newPass: string;
}