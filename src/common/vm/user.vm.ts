

import { RoleVM } from "./role.vm";

export class UserVM {
    constructor(id: string, email: string, password: string, role: RoleVM) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role
    }
    id: string;
    email: string;
    password: string;
    role: RoleVM;
}