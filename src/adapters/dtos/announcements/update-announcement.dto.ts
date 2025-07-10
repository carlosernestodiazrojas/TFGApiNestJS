/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
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

    @IsOptional()
    @IsUUID('4')
    file_id: string;

}
