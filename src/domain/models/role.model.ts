
export enum RoleName {
    GLOBAL_ADMIN = 'global_admin',
    ADMIN = 'administrador',
    PRESIDENT = 'presidente',
    OWNER = 'propietario',
}

export class RoleModel {
    constructor(id: string, code: number, name: RoleName) {
        this.id = id
        this.name = name
        this.code = code
    }
    id: string;
    code: number;
    name: RoleName;
}