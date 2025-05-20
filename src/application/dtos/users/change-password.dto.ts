import { IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordDto {

    @IsNotEmpty()
    @MinLength(6)
    oldPass: string;

    @IsNotEmpty()
    @MinLength(6)
    newPass: string;
}