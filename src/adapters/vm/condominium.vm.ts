/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { ICondominiumVM } from "src/application/vm-interfaces/condominium.vm-interface"

export class CondominiumVM implements ICondominiumVM {
    constructor(
        id: string,
        name: string,
        description: string,
        address: string,
        is_deleted: boolean,
        created: string,
        updated: string
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.address = address
        this.is_deleted = is_deleted
        this.created = created
        this.updated = updated
        this.images = []
        this.imagesUrls = []
    }
    id: string;
    name: string;
    description: string;
    address: string;
    is_deleted: boolean;

    created: string;
    updated: string;

    images: string[]
    imagesUrls: string[]

    public setImagesUrl(imagesUrls: string[]) {
        this.imagesUrls = imagesUrls
    }


}