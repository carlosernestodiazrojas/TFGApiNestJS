/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { ICreateCommonAreaDto } from '../../application/dto-interfaces/common-area/create-common-area.dto-interface';
import { IUpdateCommonAreaDto } from '../../application/dto-interfaces/common-area/update-common-area.dto-interface';
import { ICommonAreaVM } from '../vm-interfaces/common-area.vm-interface';

export const ICommonAreaRepositoryToken = 'ICommonAreaRepository';

export interface ICommonAreaRepository {
    findById(id: string): Promise<ICommonAreaVM | null>;
    findAll(condominium_id: string): Promise<ICommonAreaVM[]>;
    findAllByHoa(hoa_id: string): Promise<ICommonAreaVM[]>;
    create(dto: ICreateCommonAreaDto): Promise<ICommonAreaVM>;
    update(id: string, dto: IUpdateCommonAreaDto): Promise<ICommonAreaVM>;
    delete(id: string): Promise<void>;
}