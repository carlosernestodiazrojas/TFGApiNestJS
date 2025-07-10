/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

export interface ICommonAreaVM {
    id: string;
    name: string;
    description: string;
    is_bookable: boolean;
    daily_capacity: number;
    is_deleted: boolean;
    images: string[];
    imagesUrls: string[];
    setImagesUrl: (imagesUrls: string[]) => void;
    created: string;
    updated: string;
}