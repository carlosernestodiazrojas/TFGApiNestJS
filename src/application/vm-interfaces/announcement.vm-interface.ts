/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

export interface IAnnouncementVM {
    id: string;
    title: string;
    description: string;
    is_deleted: boolean;
    from: string;
    to: string;
    images: string[];
    imagesUrls: string[];
    setImagesUrl: (imagesUrls: string[]) => void;
    created: string;
    updated: string;
}