import { Inject, Injectable } from '@nestjs/common';
import { CreateCondominiumDto } from 'src/application/dtos/condominiums/create-condominium.dto';
import { UpdateCondominiumDto } from 'src/application/dtos/condominiums/update-condominium.dto';

import { ICondominiumRepository, ICondominiumRepositoryToken } from 'src/domain/repository-interfaces/icondominium.repository-interface';

@Injectable()
export class CondominiumManagementUseCase {
    constructor(
        @Inject(ICondominiumRepositoryToken)
        private repo: ICondominiumRepository
    ) { }


    async create(dto: CreateCondominiumDto) {
        return await this.repo.create(dto);
    }

    async update(id: string, dto: UpdateCondominiumDto) {
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