/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { ICreateCommonAreaDto } from 'src/application/dto-interfaces/common-area/create-common-area.dto-interface';

export class CreateCommonAreaDto implements ICreateCommonAreaDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    is_bookable: boolean;

    @IsNotEmpty()
    @IsNumber()
    daily_capacity: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    name: string;

    @IsNotEmpty()
    @IsUUID()
    condominium_id: string;

    @IsOptional()
    @IsUUID('4')
    file_id: string;


}