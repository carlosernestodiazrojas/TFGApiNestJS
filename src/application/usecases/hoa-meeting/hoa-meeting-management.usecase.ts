import { Inject, Injectable } from '@nestjs/common';
import { IHoaMeetingRepository, IHoaMeetingRepositoryToken } from 'src/application/repository-interfaces/ihoa-meeting.repository-interface';
import { ICreateHoaMeetingDto } from 'src/application/dto-interfaces/hoa-meeting/create-meeting.dto-interface';
import { IUpdateHoaMeetingDto } from 'src/application/dto-interfaces/hoa-meeting/update-meeting.dto-interface';

@Injectable()
export class HoaMeetingManagementUseCase {
    constructor(
        @Inject(IHoaMeetingRepositoryToken)
        private repo: IHoaMeetingRepository
    ) { }


    async create(dto: ICreateHoaMeetingDto) {
        return await this.repo.create(dto);
    }

    async update(id: string, dto: IUpdateHoaMeetingDto) {
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