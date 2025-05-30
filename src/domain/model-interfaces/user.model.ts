

import { Hoa } from "src/infrastructure/entities/hoa.entity";
import { RoleModel } from "./role.model";

export interface UserModel {
    id: string;
    email: string;
    password: string;
    name: string
    last_name: string
    role: RoleModel
    hoa: Hoa
}