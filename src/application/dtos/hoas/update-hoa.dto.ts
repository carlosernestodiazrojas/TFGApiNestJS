import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UpdateHoaDtoInterface } from 'src/domain/dto-interfaces/hoa/update-hoa.dto-interface';

export class UpdateHoaDto implements UpdateHoaDtoInterface {
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
}
