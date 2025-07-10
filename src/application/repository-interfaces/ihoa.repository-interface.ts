/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { ICreateHoaDto } from '../../application/dto-interfaces/hoa/create-hoa.dto-interface';
import { IUpdateHoaDto } from '../../application/dto-interfaces/hoa/update-hoa.dto-interface';
import { IHoaVM } from '../vm-interfaces/hoa.vm-interface';

export const IHoaRepositoryToken = 'IHoaRepository';

export interface IHoaRepository {
    findById(id: string): Promise<IHoaVM | null>;
    findAll(): Promise<IHoaVM[]>;
    create(dto: ICreateHoaDto): Promise<IHoaVM>;
    update(id: string, dto: IUpdateHoaDto): Promise<IHoaVM>;
    delete(id: string): Promise<void>;
    getPropertiesStatistics(hoaId: string): Promise<any>
}