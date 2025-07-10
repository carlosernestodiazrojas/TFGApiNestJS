/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { ICreateAnnouncementDto } from 'src/application/dto-interfaces/announcement/create-announcement.dto-interface';

export class CreateAnnouncementDto implements ICreateAnnouncementDto {

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

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    from: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    to: string;

    @IsOptional()
    @IsUUID('4')
    file_id: string;

}