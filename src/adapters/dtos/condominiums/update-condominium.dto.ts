import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { IUpdateCondominiumDto } from 'src/application/dto-interfaces/condominium/update-condominium.dto-interface';

export class UpdateCondominiumDto implements IUpdateCondominiumDto {
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
