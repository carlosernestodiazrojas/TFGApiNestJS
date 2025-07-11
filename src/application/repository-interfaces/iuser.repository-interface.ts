/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { ICreateUserDto } from '../../application/dto-interfaces/users/create-user.dto-interface';
import { IUpdateUserDto } from '../../application/dto-interfaces/users/update-user.dto-interface';
import { IUserVM } from '../vm-interfaces/user.vm-interface';

export const IUserRepositoryToken = 'IUserRepository';

export interface IUserRepository {
    findByEmail(email: string): Promise<IUserVM | null>;
    findById(id: string): Promise<IUserVM | null>;
    findAll(hoa_id: string): Promise<IUserVM[]>;
    create(dto: ICreateUserDto): Promise<IUserVM>;
    update(id: string, dto: IUpdateUserDto): Promise<IUserVM>;
    toggleActive(id: string): Promise<IUserVM>;
}