import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { CreateCommonAreaDtoInterface } from 'src/domain/dto-interfaces/common-area/create-common-area.dto-interface';

export class CreateCommonAreaDto implements CreateCommonAreaDtoInterface {

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    is_bookable: boolean;

    @IsNotEmpty()
    @IsNumber()
    daily_capacity: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    name: string;

    @IsNotEmpty()
    @IsUUID()
    condominium_id: string;

}