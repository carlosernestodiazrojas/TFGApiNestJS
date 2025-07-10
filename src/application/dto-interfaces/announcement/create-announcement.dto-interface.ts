/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

export interface ICreateAnnouncementDto {
    title: string;
    description: string;
    hoa_id: string;
    from: string;
    to: string
    file_id: string
}