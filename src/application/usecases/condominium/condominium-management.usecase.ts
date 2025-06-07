import { Inject, Injectable } from '@nestjs/common';
import { CreateCondominiumDto } from 'src/application/dtos/condominiums/create-condominium.dto';
import { UpdateCondominiumDto } from 'src/application/dtos/condominiums/update-condominium.dto';

import { ICondominiumRepository, ICondominiumRepositoryToken } from 'src/domain/repository-interfaces/icondominium.repository-interface';
import { IFileRelationRepository, IFileRelationRepositoryToken } from 'src/domain/repository-interfaces/ifile-relation.repository-interface';

@Injectable()
export class CondominiumManagementUseCase {
    constructor(
        @Inject(ICondominiumRepositoryToken)
        private repo: ICondominiumRepository,
        @Inject(IFileRelationRepositoryToken)
        private fileRelationRepo: IFileRelationRepository
    ) { }


    async create(dto: CreateCondominiumDto) {
        return await this.repo.create(dto);
    }

    async update(id: string, dto: UpdateCondominiumDto) {
        return await this.repo.update(id, dto);
    }

    async findById(id: string) {
        const condominium = await this.repo.findById(id);
        if (!condominium)
            return null

        const condominiumImages = await this.fileRelationRepo.findByRelationId("condominium", condominium?.id as string)
        condominium.images = condominiumImages
        return condominium;

    }

    async findAll(hoa_id: string) {
        const condominiums = await this.repo.findAll(hoa_id)

        for await (const condominium of condominiums) {
            const condominiumImages = await this.fileRelationRepo.findByRelationId("condominium", condominium?.id as string)
            condominium.images = condominiumImages
        }

        return condominiums
    }

    async delete(id: string) {
        return await this.repo.delete(id)
    }


}