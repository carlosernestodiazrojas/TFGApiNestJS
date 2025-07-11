/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { IHoaVM } from "./hoa.vm-interface";
import { IPropertyVM } from "./property.vm-interface";
import { IRoleVM } from "./role.vm-interface";

export class IUserVM {
    id: string;
    email: string;
    password: string;
    name: string;
    last_name: string;
    active: boolean;
    role: IRoleVM;
    hoa: IHoaVM | null;
    property: IPropertyVM | null;
    images: string[];
    imagesUrls: string[]
    setImagesUrl: (imagesUrls: string[]) => void
}