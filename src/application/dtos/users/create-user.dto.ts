import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { RoleName } from 'src/common/enums/role-name.enum';
import { CreateUserDtoInterface } from 'src/domain/dto-interfaces/users/create-user.dto-interface';

export class CreateUserDto implements CreateUserDtoInterface {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsEnum(RoleName)
    role: RoleName;
}