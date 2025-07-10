/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { IHoaVM, PropertyStatistics } from "src/application/vm-interfaces/hoa.vm-interface"
import { IUserVM } from "src/application/vm-interfaces/user.vm-interface"

export class HoaVM implements IHoaVM {
    constructor(
        id: string,
        name: string,
        address: string,
        president_id: string,
        admin_id: string,
    ) {
        this.id = id
        this.name = name
        this.address = address
        this.president_id = president_id
        this.admin_id = admin_id
        this.images = []
        this.imagesUrls = []
        this.statistics = undefined
    }


    id: string;
    name: string;
    address: string;
    images: string[]
    imagesUrls: string[]
    president_id: string;
    admin_id: string;
    statistics?: PropertyStatistics | undefined
    public setImagesUrl(imagesUrls: string[]) {
        this.imagesUrls = imagesUrls
    }

    public setStatistics(statistics: PropertyStatistics) {
        this.statistics = statistics
    }




}