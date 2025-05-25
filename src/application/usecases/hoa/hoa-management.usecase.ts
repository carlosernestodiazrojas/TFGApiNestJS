import { Inject, Injectable } from '@nestjs/common';
import { CreateHoaDto } from 'src/application/dtos/hoas/create-hoa.dto';
import { UpdateHoaDto } from 'src/application/dtos/hoas/update-hoa.dto';

import { IHoaRepository, IHoaRepositoryToken } from 'src/domain/repository-interfaces/ihoa.repository-interface';

@Injectable()
export class HoaManagementUseCase {
    constructor(
        @Inject(IHoaRepositoryToken)
        private repo: IHoaRepository
    ) { }


    async create(dto: CreateHoaDto) {
        return await this.repo.create(dto);
    }

    async update(id: string, dto: UpdateHoaDto) {
        return await this.repo.update(id, dto);
    }

    async findById(id: string) {
        return await this.repo.findById(id);
    }

    async findAll() {
        return await this.repo.findAll()
    }

    async delete(id: string) {
        return await this.repo.delete(id)
    }


}