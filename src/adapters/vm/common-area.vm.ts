/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { ICommonAreaVM } from "src/application/vm-interfaces/common-area.vm-interface"

export class CommonAreaVM implements ICommonAreaVM {
    constructor(
        id: string,
        name: string,
        description: string,
        is_bookable: boolean,
        daily_capacity: number,
        is_deleted: boolean,
        created: string,
        updated: string
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.is_bookable = is_bookable
        this.daily_capacity = daily_capacity
        this.is_deleted = is_deleted
        this.created = created
        this.updated = updated
        this.images = []
        this.imagesUrls = []
    }

    id: string;
    name: string;
    description: string;
    is_bookable: boolean;
    daily_capacity: number;
    is_deleted: boolean;

    created: string;
    updated: string;

    images: string[]
    imagesUrls: string[]

    public setImagesUrl(imagesUrls: string[]) {
        this.imagesUrls = imagesUrls
    }

}