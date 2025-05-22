import { IsEmail, IsEnum, IsOptional, MinLength } from 'class-validator';
import { RoleName } from 'src/common/enums/role-name.enum';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @MinLength(6)
    password?: string;

    @IsOptional()
    @IsEnum(RoleName)
    role?: RoleName;
}