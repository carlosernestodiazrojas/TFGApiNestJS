/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { IsBoolean, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { ICreateSpecialAssessmentDto } from 'src/application/dto-interfaces/special-assessments/create-assessment.dto-interface';

export class CreateSpecialAssessmentDto implements ICreateSpecialAssessmentDto {

    @IsNotEmpty()
    @IsBoolean()
    is_votable: boolean;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    total_amount: number;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    individual_amount: number;

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

    @IsOptional()
    @IsUUID('4')
    file_id: string;

}