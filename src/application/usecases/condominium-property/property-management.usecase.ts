/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Inject, Injectable } from '@nestjs/common';
import { IPropertyRepositoryToken, IPropertyRepository } from 'src/application/repository-interfaces/iproperty.repository-interface';
import { ICreatePropertyDto } from 'src/application/dto-interfaces/property/create-property.dto-interface';
import { IUpdatePropertyDto } from 'src/application/dto-interfaces/property/update-property.dto-interface';

@Injectable()
export class CondominiumPropertyManagementUseCase {
    constructor(
        @Inject(IPropertyRepositoryToken)
        private repo: IPropertyRepository
    ) { }


    async create(dto: ICreatePropertyDto) {
        return await this.repo.create(dto);
    }

    async update(id: string, dto: IUpdatePropertyDto) {
        return await this.repo.update(id, dto);
    }

    async findById(id: string) {
        return await this.repo.findById(id);
    }

    async findAll(condominium_id: string) {
        return await this.repo.findAll(condominium_id)
    }

    async delete(id: string) {
        return await this.repo.delete(id)
    }
}