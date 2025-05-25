import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UpdatePropertyDtoInterface } from 'src/domain/dto-interfaces/property/update-property.dto-interface';

export class UpdateCondominiumPropertyDto implements UpdatePropertyDtoInterface {

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    property_identifier: string;

}
