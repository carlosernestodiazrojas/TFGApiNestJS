import { FileRelation } from "src/adapters/entities/file_relations.entity";



export const IFileRelationRepositoryToken = 'IFileRelationRepository';

export interface IFileRelationRepository {
    findByRelationId(entityName: string, entityId: string): Promise<string[]>;
    findByRelationsIds(entityName: string, ids: string[]): Promise<any>;
}