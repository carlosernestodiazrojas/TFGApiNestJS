/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */



import { HoaModel } from "./hoa.model";
import { RoleModel } from "./role.model";
import { PropertyModel } from "./property.model";

export interface UserModel {
    id: string;
    email: string;
    password: string;
    name: string;
    last_name: string;
    role: RoleModel;
    hoa: HoaModel;
    property: PropertyModel
}