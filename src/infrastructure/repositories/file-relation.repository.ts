

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FileRelation } from '../entities/file_relations.entity';
import { IFileRelationRepository } from 'src/domain/repository-interfaces/ifile-relation.repository-interface';
import { FileEntity } from '../entities/file.entity';

@Injectable()
export class FileRelationRepository implements IFileRelationRepository {
    constructor(
        @InjectRepository(FileRelation)
        private readonly repo: Repository<FileRelation>,
    ) { }

    async findByRelationId(entityName: string, entityId: string): Promise<string[]> {
        const results = await this.repo.find({ where: { relation_entity_type: entityName, relation_entity_id: entityId }, relations: ['file'] });
        if (!results)
            return []

        const filesIds = []

        return results.map(r => r.file.id)

    }



}