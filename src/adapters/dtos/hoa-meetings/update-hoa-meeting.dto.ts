import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { IUpdateHoaMeetingDto } from 'src/application/dto-interfaces/hoa-meeting/update-meeting.dto-interface';

export class UpdateHoaMeetingDto implements IUpdateHoaMeetingDto {

    @IsOptional()
    @IsBoolean()
    is_ordinary: boolean;

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
