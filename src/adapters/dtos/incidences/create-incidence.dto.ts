/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

import { ICreateIncidenceDto } from 'src/application/dto-interfaces/incidence/create-incidence.dto-interface';

export class CreateIncidenceDto implements ICreateIncidenceDto {
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
    @IsBoolean()
    is_votable: boolean;

    @IsNotEmpty()
    @IsUUID('4')
    hoa_id: string;

    @IsOptional()
    @IsUUID('4')
    file_id: string;

}