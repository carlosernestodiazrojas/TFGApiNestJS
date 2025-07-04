import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsUUID, MinLength } from 'class-validator';
import { RoleName } from 'src/common/enums/role-name.enum';
import { ICreateUserDto } from 'src/application/dto-interfaces/users/create-user.dto-interface';

export class CreateUserDto implements ICreateUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    last_name: string;

    @IsEnum(RoleName)
    role: RoleName;

    @IsNotEmpty()
    @IsUUID('4')
    hoa_id: string;

    @IsOptional()
    @IsUUID('4')
    file_id: string;

}