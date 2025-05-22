import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { RoleName } from 'src/common/enums/role-name.enum';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsEnum(RoleName)
    role: RoleName;
}