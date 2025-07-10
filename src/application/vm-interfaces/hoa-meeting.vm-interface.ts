/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

export interface IHoaMeetingVM {
    id: string;
    name: string;
    description: string;
    is_ordinary: boolean;
    is_deleted: boolean;
}