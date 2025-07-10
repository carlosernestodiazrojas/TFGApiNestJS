/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { HoaModel } from "./hoa.model";

export interface IncidenceModel {
    id: string;
    name: string;
    description: string;
    is_votable: boolean;
    is_solved: boolean;
    solved_at: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    deleted_at: string;
    hoa: HoaModel
}