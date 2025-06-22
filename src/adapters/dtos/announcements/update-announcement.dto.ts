import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { IUpdateAnnouncementDto } from 'src/application/dto-interfaces/announcement/update-announcement.dto-interface';

export class UpdateAnnouncementDto implements IUpdateAnnouncementDto {
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

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    from: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    to: string;

}
