/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

export interface IUpdateIncidenceDto {
    name: string;
    description: string;
    is_votable: boolean;
    is_solved: boolean;
    file_id: string
}
