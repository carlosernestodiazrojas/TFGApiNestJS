import { IsBoolean, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
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

    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(255)
    property_type: string;

    @IsNotEmpty()
    @IsBoolean()
    has_storage_room: boolean;

    @IsNotEmpty()
    @IsBoolean()
    has_parking_space: boolean;

    @IsNotEmpty()
    @IsBoolean()
    current_on_payments: boolean;

}