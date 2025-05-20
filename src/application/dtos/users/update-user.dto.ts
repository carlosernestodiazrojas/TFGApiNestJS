import { IsEmail, IsEnum, IsOptional, MinLength } from 'class-validator';
import { RoleName } from 'src/domain/models/role.model';

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