import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { CreatePropertyDtoInterface } from 'src/domain/dto-interfaces/property/create-property.dto-interface';

export class CreateCondominiumPropertyDto implements CreatePropertyDtoInterface {

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    property_identifier: string;

    @IsNotEmpty()
    @IsUUID()
    condominium_id: string;

}