/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { ICreateSpecialAssessmentDto } from '../../application/dto-interfaces/special-assessments/create-assessment.dto-interface';
import { IUpdateSpecialAssessmentDto } from '../../application/dto-interfaces/special-assessments/update-assessment.dto-interface';
import { ISpecialAssessmentVM } from '../vm-interfaces/special-assessment.vm-interface';

export const ISpecialAssessmentRepositoryToken = 'ISpecialAssessmentRepository';

export interface ISpecialAssessmentRepository {
    findById(id: string): Promise<ISpecialAssessmentVM | null>;
    findAll(hoa_id: string): Promise<ISpecialAssessmentVM[]>;
    create(dto: ICreateSpecialAssessmentDto): Promise<ISpecialAssessmentVM>;
    update(id: string, dto: IUpdateSpecialAssessmentDto): Promise<ISpecialAssessmentVM>;
    delete(id: string): Promise<void>;
}