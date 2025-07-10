/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { CondominiumModel } from "./condominium.model";

export interface CommonAreaModel {
    id: string;
    name: string;
    description: string;
    is_bookable: boolean;
    daily_capacity: number;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    deleted_at: string;
    condominium: CondominiumModel;
}