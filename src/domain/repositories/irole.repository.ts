import { RoleModel, RoleName } from '../models/role.model';

export const IRoleRepositoryToken = 'IRoleRepository';

export interface IRoleRepository {
    findByName(name: RoleName): Promise<RoleModel | null>;
    findAll(): Promise<RoleModel[]>;
}