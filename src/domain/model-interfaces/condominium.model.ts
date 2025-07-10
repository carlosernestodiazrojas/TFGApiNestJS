/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { HoaModel } from "./hoa.model";

export interface CondominiumModel {
    id: string;
    name: string;
    description: string;
    address: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    deleted_at: string;
    hoa: HoaModel;
}