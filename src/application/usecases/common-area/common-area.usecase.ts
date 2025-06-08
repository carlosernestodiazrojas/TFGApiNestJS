import { Inject, Injectable } from '@nestjs/common';
import { CreateCommonAreaDtoInterface } from 'src/domain/dto-interfaces/common-area/create-common-area.dto-interface';
import { UpdateCommonAreaDtoInterface } from 'src/domain/dto-interfaces/common-area/update-common-area.dto-interface';
import { ICommonAreaRepository, ICommonAreaRepositoryToken } from 'src/domain/repository-interfaces/icommon-area.repository-interface';

@Injectable()
export class CommonAreaManagementUseCase {
    constructor(
        @Inject(ICommonAreaRepositoryToken)
        private repo: ICommonAreaRepository
    ) { }


    async create(dto: CreateCommonAreaDtoInterface) {
        return await this.repo.create(dto);
    }

    async update(id: string, dto: UpdateCommonAreaDtoInterface) {
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