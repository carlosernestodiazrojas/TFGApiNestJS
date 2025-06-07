

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleName } from 'src/common/enums/role-name.enum';
import { RoleVM } from '../../common/vm/role.vm';
import { FileRelation } from '../entities/file_relations.entity';
import { IFileRelationRepository } from 'src/domain/repository-interfaces/ifile-relation.repository-interface';

@Injectable()
export class FileRelationRepository implements IFileRelationRepository {
    constructor(
        @InjectRepository(FileRelation)
        private readonly repo: Repository<FileRelation>,
    ) { }

    async findByRelationId(entityName: string, entityId: string): Promise<string[]> {
        const results = await this.repo.find({ where: { relation_entity_type: entityName, relation_entity_id: entityId } });
        if (!results)
            return []

        const filesIds = []

        return results.map(r => r.id)

    }



}