import { RoleVM } from 'src/common/vm/role.vm';

import { RoleName } from 'src/common/enums/role-name.enum';

export const IRoleRepositoryToken = 'IRoleRepository';

export interface IRoleRepository {
    findByName(name: RoleName): Promise<RoleVM | null>;
    findAll(): Promise<RoleVM[]>;
}