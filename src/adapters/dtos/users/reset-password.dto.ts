import { IsNotEmpty, MinLength } from 'class-validator';
import { IresetPasswordDto } from 'src/application/dto-interfaces/users/reset-password.dto-interface';

export class ResetPasswordDto implements IresetPasswordDto {
    @IsNotEmpty()
    @MinLength(6)
    newPass: string;
}