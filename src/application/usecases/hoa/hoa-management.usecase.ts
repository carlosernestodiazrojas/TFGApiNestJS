/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Inject, Injectable } from '@nestjs/common';
import { IFileRelationRepository, IFileRelationRepositoryToken } from 'src/application/repository-interfaces/ifile-relation.repository-interface';
import { IHoaRepository, IHoaRepositoryToken } from 'src/application/repository-interfaces/ihoa.repository-interface';
import { ICreateHoaDto } from 'src/application/dto-interfaces/hoa/create-hoa.dto-interface';
import { IUpdateHoaDto } from 'src/application/dto-interfaces/hoa/update-hoa.dto-interface';

@Injectable()
export class HoaManagementUseCase {
    constructor(
        @Inject(IHoaRepositoryToken)
        private repo: IHoaRepository,
        @Inject(IFileRelationRepositoryToken)
        private fileRelationRepo: IFileRelationRepository
    ) { }


    async create(dto: ICreateHoaDto) {
        return await this.repo.create(dto);
    }

    async update(id: string, dto: IUpdateHoaDto) {
        return await this.repo.update(id, dto);
    }

    async findById(id: string) {
        const hoa = await this.repo.findById(id)
        if (!hoa)
            return null

        const hoaImages = await this.fileRelationRepo.findByRelationId("hoa", hoa?.id as string)
        hoa.images = hoaImages
        return hoa;
    }

    async findAll() {
        return await this.repo.findAll()
    }

    async delete(id: string) {
        return await this.repo.delete(id)
    }


    async getPropertiesStatistics(hoaId: string) {
        return await this.repo.getPropertiesStatistics(hoaId)
    }


}