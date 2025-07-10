/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { RoleName } from 'src/common/enums/role-name.enum';
import { IRoleVM } from '../vm-interfaces/role.vm-interface';

export const IRoleRepositoryToken = 'IRoleRepository';

export interface IRoleRepository {
    findByName(name: RoleName): Promise<IRoleVM | null>;
    findAll(): Promise<IRoleVM[]>;
}