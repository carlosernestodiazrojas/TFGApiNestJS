import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { CreateHoaDtoInterface } from 'src/domain/dto-interfaces/hoa/create-hoa.dto-interface';

export class CreateHoaDto implements CreateHoaDtoInterface {
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    address: string;
}