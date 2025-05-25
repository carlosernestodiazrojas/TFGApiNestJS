
import { IsBoolean, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

import { CreateIncidenceDtoInterface } from 'src/domain/dto-interfaces/incidence/create-incidence.dto-interface';

export class CreateIncidenceDto implements CreateIncidenceDtoInterface {
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    is_votable: boolean;

    @IsNotEmpty()
    @IsUUID('4')
    hoa_id: string;
}