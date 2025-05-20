

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../infrastructure/entities/role.entity';
import { IRoleRepository } from 'src/domain/repositories/irole.repository';
import { RoleModel } from 'src/domain/models/role.model';
import { RoleName } from 'src/domain/models/role.model';

@Injectable()
export class RoleRepository implements IRoleRepository {
    constructor(
        @InjectRepository(Role)
        private readonly repo: Repository<Role>,
    ) { }

    async findByName(name: RoleName): Promise<RoleModel | null> {
        const ent = await this.repo.findOne({ where: { name } });
        if (!ent) return null;
        return new RoleModel(ent.id, ent.code, ent.name as RoleName);
    }

    async findAll(): Promise<RoleModel[]> {
        const ents = await this.repo.find();
        return ents.map(e => new RoleModel(e.id, e.code, e.name as RoleName));
    }
}