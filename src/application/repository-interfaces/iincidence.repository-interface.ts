/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { ICreateIncidenceDto } from '../../application/dto-interfaces/incidence/create-incidence.dto-interface';
import { IUpdateIncidenceDto } from '../../application/dto-interfaces/incidence/update-incidence.dto-interface';
import { IIncidenceVM } from '../vm-interfaces/incidence.vm-interface';

export const IIncidenceRepositoryToken = 'IIncidenceRepository';

export interface IIncidenceRepository {
    findById(id: string): Promise<IIncidenceVM | null>;
    findAll(hoa_id: string): Promise<IIncidenceVM[]>;
    create(dto: ICreateIncidenceDto): Promise<IIncidenceVM>;
    update(id: string, dto: IUpdateIncidenceDto): Promise<IIncidenceVM>;
    delete(id: string): Promise<void>;
}