/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

export interface ICreateIncidenceDto {
    name: string;
    description: string;
    is_votable: boolean;
    hoa_id: string
    file_id: string
}