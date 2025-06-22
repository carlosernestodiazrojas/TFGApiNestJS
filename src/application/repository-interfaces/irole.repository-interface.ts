import { RoleName } from 'src/common/enums/role-name.enum';
import { IRoleVM } from '../vm-interfaces/role.vm-interface';

export const IRoleRepositoryToken = 'IRoleRepository';

export interface IRoleRepository {
    findByName(name: RoleName): Promise<IRoleVM | null>;
    findAll(): Promise<IRoleVM[]>;
}