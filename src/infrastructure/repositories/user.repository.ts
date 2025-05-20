
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../infrastructure/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/iuser.repository';
import { CreateUserDto } from 'src/application/dtos/users/create-user.dto';
import { UpdateUserDto } from 'src/application/dtos/users/update-user.dto';
import { UserModel } from 'src/domain/models/user.model';
import { RoleModel, RoleName } from 'src/domain/models/role.model';
import { RoleRepository } from './role.repository';

@Injectable()

export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
        private readonly roleRepo: RoleRepository,
    ) { }

    private toDomain(user: User): UserModel {
        return new UserModel(
            user.id,
            user.email,
            user.password,
            new RoleModel(user.role.id, user.role.code, user.role.name as RoleName),
        );
    }

    async findByEmail(email: string): Promise<UserModel | null> {
        const ent = await this.repo.findOne({ where: { email }, relations: ['role'] });
        return ent ? this.toDomain(ent) : null;
    }

    async findById(id: string): Promise<UserModel | null> {
        const ent = await this.repo.findOne({ where: { id }, relations: ['role'] });
        return ent ? this.toDomain(ent) : null;
    }

    async findAll(): Promise<UserModel[]> {
        const ents = await this.repo.find({ relations: ['role'] });
        return ents.map(e => this.toDomain(e));
    }

    async create(dto: CreateUserDto): Promise<UserModel> {
        // 1) Busca la entidad Role
        const roleEnt = await this.roleRepo.findByName(dto.role);
        if (!roleEnt) throw new NotFoundException('Rol no encontrado');
        // 2) Crea la entidad con la relación
        const ent = this.repo.create({
            email: dto.email,
            password: dto.password,
            role: { id: roleEnt.id },  // solo hace falta el id para la FK
        });
        // 3) Guarda y convierte a modelo de dominio
        const saved = await this.repo.save(ent);
        return this.toDomain(saved);
    }

    async update(id: string, dto: UpdateUserDto): Promise<UserModel> {

        const user = await this.repo.findOne({ where: { id }, relations: ['role'] });
        if (!user) throw new NotFoundException('Usuario no encontrado');

        if (dto.role) {
            const roleEnt = await this.roleRepo.findByName(dto.role);
            if (!roleEnt) throw new NotFoundException('Rol no encontrado');
            dto = { ...dto, role: undefined };
            await this.repo
                .createQueryBuilder()
                .relation(User, 'role')
                .of(id)
                .set(roleEnt.id);
        }

        if (dto.email || dto.password)
            await this.repo.update(id, dto as any);

        const updated = await this.repo.findOne({ where: { id }, relations: ['role'] });
        return this.toDomain(updated as User);
    }
}
