/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { ICreateHoaMeetingDto } from '../../application/dto-interfaces/hoa-meeting/create-meeting.dto-interface';
import { IUpdateHoaMeetingDto } from '../../application/dto-interfaces/hoa-meeting/update-meeting.dto-interface';
import { IHoaMeetingVM } from '../vm-interfaces/hoa-meeting.vm-interface';

export const IHoaMeetingRepositoryToken = 'IHoaMeetingRepository';

export interface IHoaMeetingRepository {
    findById(id: string): Promise<IHoaMeetingVM | null>;
    findAll(hoa_id: string): Promise<IHoaMeetingVM[]>;
    create(dto: ICreateHoaMeetingDto): Promise<IHoaMeetingVM>;
    update(id: string, dto: IUpdateHoaMeetingDto): Promise<IHoaMeetingVM>;
    delete(id: string): Promise<void>;
}