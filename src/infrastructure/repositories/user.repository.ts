
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../infrastructure/entities/user.entity';
import { IUserRepository } from 'src/domain/repository-interfaces/iuser.repository-interface';
import { CreateUserDto } from 'src/application/dtos/users/create-user.dto';
import { UpdateUserDto } from 'src/application/dtos/users/update-user.dto';
import { UserVM } from 'src/common/vm/user.vm';
import { RoleRepository } from './role.repository';
import { RoleName } from 'src/common/enums/role-name.enum';
import { RoleVM } from 'src/common/vm/role.vm';

@Injectable()

export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
        private readonly roleRepo: RoleRepository,
    ) { }

    private toViewModel(user: User): UserVM {
        return new UserVM(
            user.id,
            user.email,
            user.password,
            new RoleVM(user.role.id, user.role.code, user.role.name as RoleName),
        );
    }

    async findByEmail(email: string): Promise<UserVM | null> {
        const ent = await this.repo.findOne({ where: { email }, relations: ['role'] });
        return ent ? this.toViewModel(ent) : null;
    }

    async findById(id: string): Promise<UserVM | null> {
        const ent = await this.repo.findOne({ where: { id }, relations: ['role'] });
        return ent ? this.toViewModel(ent) : null;
    }

    async findAll(): Promise<UserVM[]> {
        const ents = await this.repo.find({ relations: ['role'] });
        return ents.map(e => this.toViewModel(e));
    }

    async create(dto: CreateUserDto): Promise<UserVM> {

        const roleEnt = await this.roleRepo.findByName(dto.role);
        if (!roleEnt) throw new NotFoundException('Rol no encontrado');

        const ent = this.repo.create({
            email: dto.email,
            password: dto.password,
            role: { id: roleEnt.id },

        });

        const saved = await this.repo.save(ent);
        return this.toViewModel(saved);
    }

    async update(id: string, dto: UpdateUserDto): Promise<UserVM> {

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
        return this.toViewModel(updated as User);
    }
}
