import { Inject, Injectable } from '@nestjs/common';
import { CreateHoaMeetingDto } from 'src/application/dtos/hoa-meetings/create-hoa-meeting.dto';
import { UpdateHoaMeetingDto } from 'src/application/dtos/hoa-meetings/update-hoa-meeting.dto';

import { IHoaMeetingRepository, IHoaMeetingRepositoryToken } from 'src/domain/repository-interfaces/ihoa-meeting.repository-interface';

@Injectable()
export class HoaMeetingManagementUseCase {
    constructor(
        @Inject(IHoaMeetingRepositoryToken)
        private repo: IHoaMeetingRepository
    ) { }


    async create(dto: CreateHoaMeetingDto) {
        return await this.repo.create(dto);
    }

    async update(id: string, dto: UpdateHoaMeetingDto) {
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