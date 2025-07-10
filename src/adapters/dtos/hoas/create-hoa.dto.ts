/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { ICreateHoaDto } from 'src/application/dto-interfaces/hoa/create-hoa.dto-interface';

export class CreateHoaDto implements ICreateHoaDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    address: string;
}