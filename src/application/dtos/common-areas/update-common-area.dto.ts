import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UpdateCommonAreaDtoInterface } from 'src/domain/dto-interfaces/common-area/update-common-area.dto-interface';

export class UpdateCommonAreaDto implements UpdateCommonAreaDtoInterface {

    @IsOptional()
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


}
