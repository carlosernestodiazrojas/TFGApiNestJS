import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { RoleName } from 'src/domain/models/role.model';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsEnum(RoleName)
    role: RoleName;
}