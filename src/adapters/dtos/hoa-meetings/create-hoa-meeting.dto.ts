
import { IsBoolean, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { ICreateHoaMeetingDto } from 'src/application/dto-interfaces/hoa-meeting/create-meeting.dto-interface';

export class CreateHoaMeetingDto implements ICreateHoaMeetingDto {

    @IsNotEmpty()
    @IsBoolean()
    is_ordinary: boolean;

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
    @IsUUID('4')
    hoa_id: string;
}