/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

export interface ICreateCommonAreaDto {
    name: string;
    description: string;
    is_bookable: boolean;
    daily_capacity: number;
    condominium_id: string;
    file_id: string;
}