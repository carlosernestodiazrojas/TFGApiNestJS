import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UpdateAnnouncementDtoInterface } from 'src/domain/dto-interfaces/announcement/update-announcement.dto-interface';
import { UpdateIncidenceDtoInterface } from 'src/domain/dto-interfaces/incidence/update-incidence.dto-interface';

export class UpdateIncidenceDto implements UpdateIncidenceDtoInterface {

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

}
