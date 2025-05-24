
import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { CreateAnnouncementDtoInterface } from 'src/domain/dto-interfaces/announcement/create-announcement.dto-interface';

export class CreateAnnouncementDto implements CreateAnnouncementDtoInterface {
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    title: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    description: string;

    @IsNotEmpty()
    @IsUUID('4')
    hoa_id: string;
}