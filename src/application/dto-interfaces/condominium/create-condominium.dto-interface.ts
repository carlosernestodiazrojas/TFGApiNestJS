/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

export interface ICreateCondominiumDto {
    name: string;
    description: string;
    address: string;
    hoa_id: string;
    file_id?: string
}