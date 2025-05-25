import { Inject, Injectable } from '@nestjs/common';
import { CreateCondominiumPropertyDto } from 'src/application/dtos/condominium-properties/create-condominium-property.dto';
import { UpdateCondominiumPropertyDto } from 'src/application/dtos/condominium-properties/update-condominium-property.dto';

import { IPropertyRepositoryToken, IPropertyRepository } from 'src/domain/repository-interfaces/iproperty.repository-interface';

@Injectable()
export class CondominiumPropertyManagementUseCase {
    constructor(
        @Inject(IPropertyRepositoryToken)
        private repo: IPropertyRepository
    ) { }


    async create(dto: CreateCondominiumPropertyDto) {
        return await this.repo.create(dto);
    }

    async update(id: string, dto: UpdateCondominiumPropertyDto) {
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