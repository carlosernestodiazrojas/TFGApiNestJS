

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { FileRelation } from '../entities/file_relations.entity';
import { IFileRelationRepository } from 'src/application/repository-interfaces/ifile-relation.repository-interface';
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

    async findByRelationsIds(entityName: string, ids: string[]): Promise<Map<string, FileRelation[]>> {

        const results = await this.repo.find({
            where: {
                relation_entity_id: In(ids),
                relation_entity_type: entityName,
            },
            relations: ['file']
        });

        if (!results)
            return new Map<string, FileRelation[]>();

        const filesMap = new Map<string, FileRelation[]>();
        for (const fileRelation of results) {
            const files = filesMap.get(fileRelation.relation_entity_id) || [];
            files.push(fileRelation);
            filesMap.set(fileRelation.relation_entity_id, files);
        }

        return filesMap

    }





}