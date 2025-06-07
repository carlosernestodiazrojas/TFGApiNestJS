import { Inject, Injectable } from '@nestjs/common';
import { CreateHoaDto } from 'src/application/dtos/hoas/create-hoa.dto';
import { UpdateHoaDto } from 'src/application/dtos/hoas/update-hoa.dto';
import { IFileEntityRepositoryToken } from 'src/domain/repository-interfaces/ifile-entity.repository-interface';
import { IFileRelationRepository, IFileRelationRepositoryToken } from 'src/domain/repository-interfaces/ifile-relation.repository-interface';

import { IHoaRepository, IHoaRepositoryToken } from 'src/domain/repository-interfaces/ihoa.repository-interface';

@Injectable()
export class HoaManagementUseCase {
    constructor(
        @Inject(IHoaRepositoryToken)
        private repo: IHoaRepository,
        @Inject(IFileRelationRepositoryToken)
        private fileRelationRepo: IFileRelationRepository
    ) { }


    async create(dto: CreateHoaDto) {
        return await this.repo.create(dto);
    }

    async update(id: string, dto: UpdateHoaDto) {
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


}