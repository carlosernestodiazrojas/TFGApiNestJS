/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { ICreateAnnouncementDto } from '../../application/dto-interfaces/announcement/create-announcement.dto-interface';
import { IUpdateAnnouncementDto } from '../../application/dto-interfaces/announcement/update-announcement.dto-interface';
import { IAnnouncementVM } from '../vm-interfaces/announcement.vm-interface';

export const IAnnouncementRepositoryToken = 'IAnnouncementRepository';

export interface IAnnouncementRepository {
    findById(id: string): Promise<IAnnouncementVM | null>;
    findAll(hoa_id: string, limit: number, offset: number): Promise<IAnnouncementVM[]>;
    create(dto: ICreateAnnouncementDto): Promise<IAnnouncementVM>;
    update(id: string, dto: IUpdateAnnouncementDto): Promise<IAnnouncementVM>;
    delete(id: string): Promise<void>;
}