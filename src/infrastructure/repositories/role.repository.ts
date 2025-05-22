

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../infrastructure/entities/role.entity';
import { IRoleRepository } from 'src/domain/repositories/irole.repository';
import { RoleName } from 'src/common/enums/role-name.enum';
import { RoleVM } from '../../common/vm/role.vm';

@Injectable()
export class RoleRepository implements IRoleRepository {
    constructor(
        @InjectRepository(Role)
        private readonly repo: Repository<Role>,
    ) { }

    async findByName(name: RoleName): Promise<RoleVM | null> {
        const ent = await this.repo.findOne({ where: { name } });
        if (!ent) return null;
        return new RoleVM(ent.id, ent.code, ent.name as RoleName);
    }

    async findAll(): Promise<RoleVM[]> {
        const ents = await this.repo.find();
        return ents.map(e => new RoleVM(e.id, e.code, e.name as RoleName));
    }
}