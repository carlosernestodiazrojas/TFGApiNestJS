import { IsEmail, IsNotEmpty } from 'class-validator';
import { IRefreshTokenDto } from 'src/application/dto-interfaces/users/refresh-token.dto-interface';

export class RefreshTokenDto implements IRefreshTokenDto {
    @IsNotEmpty()
    userId: string;
}