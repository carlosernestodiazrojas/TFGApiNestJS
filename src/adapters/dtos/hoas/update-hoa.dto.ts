import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { IUpdateHoaDto } from 'src/application/dto-interfaces/hoa/update-hoa.dto-interface';

export class UpdateHoaDto implements IUpdateHoaDto {
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
