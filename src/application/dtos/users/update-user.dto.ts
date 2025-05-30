import { IsEmail, IsEnum, IsOptional, MinLength } from 'class-validator';
import { RoleName } from 'src/common/enums/role-name.enum';
import { UpdateUserDtoInterface } from 'src/domain/dto-interfaces/users/update-user.dto-interface';

export class UpdateUserDto implements UpdateUserDtoInterface {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @MinLength(6)
    password?: string;

    @IsOptional()
    name?: string;

    @IsOptional()
    last_name?: string;

    @IsOptional()
    @IsEnum(RoleName)
    role?: RoleName;
}