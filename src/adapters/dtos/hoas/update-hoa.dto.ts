/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { IUpdateHoaDto } from 'src/application/dto-interfaces/hoa/update-hoa.dto-interface';

export class UpdateHoaDto implements IUpdateHoaDto {
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    name?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    address?: string;


    @IsOptional()
    @IsUUID('4')
    president_id?: string;

    @IsOptional()
    @IsUUID('4')
    admin_id?: string;


}
