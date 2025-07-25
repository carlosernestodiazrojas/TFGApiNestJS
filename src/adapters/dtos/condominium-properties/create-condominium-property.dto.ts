/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { IsBoolean, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { ICreatePropertyDto } from 'src/application/dto-interfaces/property/create-property.dto-interface';

export class CreateCondominiumPropertyDto implements ICreatePropertyDto {


    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    property_identifier: string;

    @IsNotEmpty()
    @IsUUID()
    condominium_id: string;

    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(255)
    property_type: string;

    @IsNotEmpty()
    @IsBoolean()
    has_storage_room: boolean;

    @IsNotEmpty()
    @IsBoolean()
    has_parking_space: boolean;

    @IsNotEmpty()
    @IsBoolean()
    current_on_payments: boolean;

}