import { IsNotEmpty, MinLength } from 'class-validator';
import { ChangePasswordDtoInterface } from 'src/domain/dto-interfaces/users/change-password.dto-interface';

export class ChangePasswordDto implements ChangePasswordDtoInterface {

    @IsNotEmpty()
    @MinLength(6)
    oldPass: string;

    @IsNotEmpty()
    @MinLength(6)
    newPass: string;
}