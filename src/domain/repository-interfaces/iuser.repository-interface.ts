import { UserVM } from 'src/common/vm/user.vm';
import { CreateUserDtoInterface } from '../dto-interfaces/users/create-user.dto-interface';
import { UpdateUserDtoInterface } from '../dto-interfaces/users/update-user.dto-interface';

export const IUserRepositoryToken = 'IUserRepository';

export interface IUserRepository {
    findByEmail(email: string): Promise<UserVM | null>;
    findById(id: string): Promise<UserVM | null>;
    findAll(): Promise<UserVM[]>;
    create(dto: CreateUserDtoInterface): Promise<UserVM>;
    update(id: string, dto: UpdateUserDtoInterface): Promise<UserVM>;
}