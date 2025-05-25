import { Inject, Injectable } from '@nestjs/common';
import { CreateAnnouncementDto } from 'src/application/dtos/announcements/create-announcement.dto';
import { UpdateAnnouncementDto } from 'src/application/dtos/announcements/update-announcement.dto';

import { IAnnouncementRepository, IAnnouncementRepositoryToken } from 'src/domain/repository-interfaces/iannouncement.repository-interface';

@Injectable()
export class AnnouncementManagementUseCase {
    constructor(
        @Inject(IAnnouncementRepositoryToken)
        private repo: IAnnouncementRepository
    ) { }


    async create(dto: CreateAnnouncementDto) {
        return await this.repo.create(dto);
    }

    async update(id: string, dto: UpdateAnnouncementDto) {
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