import { Inject, Injectable } from '@nestjs/common';
import { IAnnouncementRepository, IAnnouncementRepositoryToken } from 'src/application/repository-interfaces/iannouncement.repository-interface';
import { ICreateAnnouncementDto } from 'src/application/dto-interfaces/announcement/create-announcement.dto-interface';
import { IUpdateAnnouncementDto } from 'src/application/dto-interfaces/announcement/update-announcement.dto-interface';

@Injectable()
export class AnnouncementManagementUseCase {
    constructor(
        @Inject(IAnnouncementRepositoryToken)
        private repo: IAnnouncementRepository
    ) { }


    async create(dto: ICreateAnnouncementDto) {
        return await this.repo.create(dto);
    }

    async update(id: string, dto: IUpdateAnnouncementDto) {
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