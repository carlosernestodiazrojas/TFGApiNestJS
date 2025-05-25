import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UpdateAnnouncementDtoInterface } from 'src/domain/dto-interfaces/announcement/update-announcement.dto-interface';

export class UpdateAnnouncementDto implements UpdateAnnouncementDtoInterface {
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    title: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    description: string;

}
