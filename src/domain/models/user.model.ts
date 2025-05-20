

import { RoleModel } from "./role.model";

export class UserModel {
    constructor(id: string, email: string, password: string, role: RoleModel) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role
    }
    id: string;
    email: string;
    password: string;
    role: RoleModel;
}