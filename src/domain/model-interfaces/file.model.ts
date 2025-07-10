/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

export interface FileModel {

    id: string;
    sha256: string;
    mimetype: string;
    extension: string;
    size: number;
    originalName: string;
    url: string;

}