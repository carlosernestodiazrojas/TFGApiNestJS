/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { IsBoolean, IsDecimal, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { IUpdateSpecialAssessmentDto } from 'src/application/dto-interfaces/special-assessments/update-assessment.dto-interface';

export class UpdateSpecialAssessmentDto implements IUpdateSpecialAssessmentDto {

    @IsOptional()
    @IsBoolean()
    is_approved: boolean;

    @IsOptional()
    @IsBoolean()
    is_votable: boolean;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    total_amount: number;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    individual_amount: number;

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
    @IsUUID('4')
    file_id: string;


}
