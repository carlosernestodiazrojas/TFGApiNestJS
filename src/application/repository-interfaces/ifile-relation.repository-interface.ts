/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { FileRelation } from "src/adapters/entities/file_relations.entity";

export const IFileRelationRepositoryToken = 'IFileRelationRepository';

export interface IFileRelationRepository {
    findByRelationId(entityName: string, entityId: string): Promise<string[]>;
    findByRelationsIds(entityName: string, ids: string[]): Promise<any>;
    findByRelationIdAndCreateOrReplace(entityName: string, entityId: string, fileId: string): Promise<boolean>;
}