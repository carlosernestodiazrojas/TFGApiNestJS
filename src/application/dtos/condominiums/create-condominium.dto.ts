import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { CreateCondominiumDtoInterface } from 'src/domain/dto-interfaces/condominium/create-condominium.dto-interface';

export class CreateCondominiumDto implements CreateCondominiumDtoInterface {

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

}