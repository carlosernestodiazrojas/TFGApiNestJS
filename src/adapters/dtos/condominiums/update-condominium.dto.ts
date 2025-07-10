/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { IUpdateCondominiumDto } from 'src/application/dto-interfaces/condominium/update-condominium.dto-interface';

export class UpdateCondominiumDto implements IUpdateCondominiumDto {
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
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    description: string;

    @IsOptional()
    @IsUUID('4')
    file_id: string;

}
