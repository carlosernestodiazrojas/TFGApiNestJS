import { Inject, Injectable } from '@nestjs/common';
import { IIncidenceRepository, IIncidenceRepositoryToken } from 'src/application/repository-interfaces/iincidence.repository-interface';
import { IUpdateIncidenceDto } from 'src/application/dto-interfaces/incidence/update-incidence.dto-interface';
import { ICreateIncidenceDto } from 'src/application/dto-interfaces/incidence/create-incidence.dto-interface';

@Injectable()
export class IncidenceManagementUseCase {
    constructor(
        @Inject(IIncidenceRepositoryToken)
        private repo: IIncidenceRepository
    ) { }


    async create(dto: ICreateIncidenceDto) {
        return await this.repo.create(dto);
    }

    async update(id: string, dto: IUpdateIncidenceDto) {
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