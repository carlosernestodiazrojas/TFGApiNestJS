/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { RoleName } from "src/common/enums/role-name.enum";

export interface RoleModel {
    id: string;
    code: number;
    name: RoleName;
}