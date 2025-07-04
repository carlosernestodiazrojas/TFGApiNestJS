import { IsBoolean, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { IUpdateIncidenceDto } from 'src/application/dto-interfaces/incidence/update-incidence.dto-interface';

export class UpdateIncidenceDto implements IUpdateIncidenceDto {

    @IsOptional()
    @IsBoolean()
    is_votable: boolean;

    @IsOptional()
    @IsBoolean()
    is_solved: boolean;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    name: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    description: string;

    @IsOptional()
    @IsUUID('4')
    file_id: string;

}
