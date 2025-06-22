


export const IFileRelationRepositoryToken = 'IFileRelationRepository';

export interface IFileRelationRepository {
    findByRelationId(entityName: string, entityId: string): Promise<string[]>;
}