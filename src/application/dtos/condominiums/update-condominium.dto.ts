import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UpdateCondominiumDtoInterface } from 'src/domain/dto-interfaces/condominium/update-condominium.dto-interface';

export class UpdateCondominiumDto implements UpdateCondominiumDtoInterface {
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    name?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    address?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    description: string;
}
