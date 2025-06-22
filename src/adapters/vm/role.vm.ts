
import { IRoleVM } from "src/application/vm-interfaces/role.vm-interface";
import { RoleName } from "src/common/enums/role-name.enum";

export class RoleVM implements IRoleVM {
    constructor(id: string, code: number, name: RoleName) {
        this.id = id
        this.name = name
        this.code = code
    }
    id: string;
    code: number;
    name: RoleName;
}