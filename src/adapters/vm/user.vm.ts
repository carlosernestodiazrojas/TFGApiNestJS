

import { IUserVM } from "src/application/vm-interfaces/user.vm-interface";
import { HoaVM } from "./hoa.vm";
import { RoleVM } from "./role.vm";

export class UserVM implements IUserVM {
    constructor(id: string, email: string, password: string, name: string, last_name: string, role: RoleVM, hoa: HoaVM | null) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.hoa = hoa
        this.name = name;
        this.last_name = last_name
    }
    id: string;
    email: string;
    password: string;
    name: string;
    last_name: string;
    role: RoleVM;
    hoa: HoaVM | null;
}