

import { RoleModel } from "./role.model";

export interface UserModel {
    id: string;
    email: string;
    password: string;
    role: RoleModel
}