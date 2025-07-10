/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { CondominiumModel } from "./condominium.model";

export interface PropertyModel {
    id: string;
    property_identifier: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    deleted_at: string;
    property_type: string;
    has_storage_room: boolean;
    has_parking_space: boolean;
    current_on_payments: boolean;
    condominium: CondominiumModel;
}