import { ICreateUserDto } from '../../application/dto-interfaces/users/create-user.dto-interface';
import { IUpdateUserDto } from '../../application/dto-interfaces/users/update-user.dto-interface';
import { IUserVM } from '../vm-interfaces/user.vm-interface';

export const IUserRepositoryToken = 'IUserRepository';

export interface IUserRepository {
    findByEmail(email: string): Promise<IUserVM | null>;
    findById(id: string): Promise<IUserVM | null>;
    findAll(hoa_id: string): Promise<IUserVM[]>;
    create(dto: ICreateUserDto): Promise<IUserVM>;
    update(id: string, dto: IUpdateUserDto): Promise<IUserVM>;
}