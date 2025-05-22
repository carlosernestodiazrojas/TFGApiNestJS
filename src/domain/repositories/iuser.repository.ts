import { CreateUserDto } from 'src/application/dtos/users/create-user.dto';
import { UpdateUserDto } from 'src/application/dtos/users/update-user.dto';
import { UserVM } from 'src/common/vm/user.vm';

export const IUserRepositoryToken = 'IUserRepository';

export interface IUserRepository {
    findByEmail(email: string): Promise<UserVM | null>;
    findById(id: string): Promise<UserVM | null>;
    findAll(): Promise<UserVM[]>;
    create(dto: CreateUserDto): Promise<UserVM>;
    update(id: string, dto: UpdateUserDto): Promise<UserVM>;
}