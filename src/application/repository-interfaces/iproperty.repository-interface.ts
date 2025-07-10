/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { ICreatePropertyDto } from '../../application/dto-interfaces/property/create-property.dto-interface';
import { IUpdatePropertyDto } from '../../application/dto-interfaces/property/update-property.dto-interface';
import { IPropertyVM } from '../vm-interfaces/property.vm-interface';

export const IPropertyRepositoryToken = 'IPropertyRepository';

export interface IPropertyRepository {
    findById(id: string): Promise<IPropertyVM | null>;
    findAll(condominium_id: string): Promise<IPropertyVM[]>;
    create(dto: ICreatePropertyDto): Promise<IPropertyVM>;
    update(id: string, dto: IUpdatePropertyDto): Promise<IPropertyVM>;
    delete(id: string): Promise<void>;
}