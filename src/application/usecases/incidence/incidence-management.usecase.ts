import { Inject, Injectable } from '@nestjs/common';
import { CreateIncidenceDto } from 'src/application/dtos/incidences/create-incidence.dto';
import { UpdateIncidenceDto } from 'src/application/dtos/incidences/update-incidence.dto';

import { IIncidenceRepository, IIncidenceRepositoryToken } from 'src/domain/repository-interfaces/iincidence.repository-interface';

@Injectable()
export class IncidenceManagementUseCase {
    constructor(
        @Inject(IIncidenceRepositoryToken)
        private repo: IIncidenceRepository
    ) { }


    async create(dto: CreateIncidenceDto) {
        return await this.repo.create(dto);
    }

    async update(id: string, dto: UpdateIncidenceDto) {
        return await this.repo.update(id, dto);
    }

    async findById(id: string) {
        return await this.repo.findById(id);
    }

    async findAll(hoa_id: string) {
        return await this.repo.findAll(hoa_id)
    }

    async delete(id: string) {
        return await this.repo.delete(id)
    }


}