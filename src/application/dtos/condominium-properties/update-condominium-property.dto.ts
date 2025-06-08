import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UpdatePropertyDtoInterface } from 'src/domain/dto-interfaces/property/update-property.dto-interface';

export class UpdateCondominiumPropertyDto implements UpdatePropertyDtoInterface {
    @IsOptional()
    @MinLength(1)
    @MaxLength(255)
    property_type: string;

    @IsOptional()
    @IsBoolean()
    has_storage_room: boolean;

    @IsOptional()
    @IsBoolean()
    has_parking_space: boolean;

    @IsOptional()
    @IsBoolean()
    current_on_payments: boolean;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    property_identifier: string;

}
