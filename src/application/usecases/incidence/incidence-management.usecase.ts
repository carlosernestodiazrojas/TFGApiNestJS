/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Inject, Injectable } from '@nestjs/common';
import { IIncidenceRepository, IIncidenceRepositoryToken } from 'src/application/repository-interfaces/iincidence.repository-interface';
import { IUpdateIncidenceDto } from 'src/application/dto-interfaces/incidence/update-incidence.dto-interface';
import { ICreateIncidenceDto } from 'src/application/dto-interfaces/incidence/create-incidence.dto-interface';
import { IFileRelationRepository, IFileRelationRepositoryToken } from 'src/application/repository-interfaces/ifile-relation.repository-interface';

@Injectable()
export class IncidenceManagementUseCase {
    constructor(
        @Inject(IIncidenceRepositoryToken)
        private repo: IIncidenceRepository,
        @Inject(IFileRelationRepositoryToken)
        private fileRelationRepo: IFileRelationRepository
    ) { }


    async create(dto: ICreateIncidenceDto) {

        const incidence = await this.repo.create(dto);

        if (dto.file_id && dto.file_id.length > 0)
            await this.fileRelationRepo.findByRelationIdAndCreateOrReplace('incidence', incidence.id, dto.file_id);

        return this.repo.findById(incidence.id)
    }

    async update(id: string, dto: IUpdateIncidenceDto) {

        const incidence = await this.repo.update(id, dto);

        if (dto.file_id && dto.file_id.length > 0)
            await this.fileRelationRepo.findByRelationIdAndCreateOrReplace('incidence', incidence.id, dto.file_id);

        return this.repo.findById(incidence.id)
    }

    async findById(id: string) {

        const incidence = await this.repo.findById(id);
        if (!incidence)
            return null

        const incidenceImages = await this.fileRelationRepo.findByRelationId("incidence", incidence?.id as string)
        incidence.images = incidenceImages

        return incidence

    }

    async findAll(hoa_id: string) {

        const incidences = await this.repo.findAll(hoa_id)

        for await (const incidence of incidences) {
            const incidenceImages = await this.fileRelationRepo.findByRelationId("incidence", incidence?.id as string)
            incidence.images = incidenceImages
        }

        const incidenceIds = incidences.map(incidence => incidence.id);

        const filesMap = await this.fileRelationRepo.findByRelationsIds('incidence', incidenceIds)

        if (filesMap.size > 0)
            for (const incidence of incidences) {
                let images = []
                const fileImagesMap = filesMap.get(incidence.id)

                if (fileImagesMap) {
                    images = fileImagesMap.map(image => image.file.id)
                }

                incidence.images = images
            }

        return incidences
    }

    async delete(id: string) {
        return await this.repo.delete(id)
    }


}