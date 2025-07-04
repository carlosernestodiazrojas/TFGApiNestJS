

import { Injectable, NotFoundException } from '@nestjs/common';
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
        @InjectRepository(FileEntity)
        private readonly fileRepo: Repository<FileEntity>,
    ) { }

    async findByRelationId(entityName: string, entityId: string): Promise<string[]> {
        const results = await this.repo.find({ where: { relation_entity_type: entityName, relation_entity_id: entityId }, relations: ['file'] });
        if (!results)
            return []

        const filesIds = []

        return results.map(r => r.file.id)

    }

    async findByRelationIdAndCreateOrReplace(entityName: string, entityId: string, fileId: string): Promise<boolean> {
        const fileResult = await this.repo.findOne({ where: { relation_entity_type: entityName, relation_entity_id: entityId }, relations: ['file'] });

        const file = await this.fileRepo.findOne({ where: { id: fileId } });

        if (!file) return false;

        if (!fileResult) {
            const newFileResult = this.repo.create({
                is_deleted: false,
                relation_entity_id: entityId,
                relation_entity_type: entityName,
                file
            })
            await this.repo.save(newFileResult);
        } else {
            fileResult.file = file
            await this.repo.save(fileResult)
        }

        return true
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