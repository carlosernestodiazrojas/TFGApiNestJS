import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { ICreateCondominiumDto } from 'src/application/dto-interfaces/condominium/create-condominium.dto-interface';

export class CreateCondominiumDto implements ICreateCondominiumDto {

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

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    description: string;

    @IsNotEmpty()
    @IsUUID()
    hoa_id: string;

    @IsOptional()
    @IsUUID('4')
    file_id: string;

}