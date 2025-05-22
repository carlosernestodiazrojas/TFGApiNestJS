import { UserModel } from '../models/user.model';
import { CreateUserDto } from 'src/application/dtos/users/create-user.dto';
import { UpdateUserDto } from 'src/application/dtos/users/update-user.dto';

export const IUserRepositoryToken = 'IUserRepository';

export interface IUserRepository {
    findByEmail(email: string): Promise<UserModel | null>;
    findById(id: string): Promise<UserModel | null>;
    findAll(): Promise<UserModel[]>;
    create(dto: CreateUserDto): Promise<UserModel>;
    update(id: string, dto: UpdateUserDto): Promise<UserModel>;
}