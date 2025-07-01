import { Inject, Injectable } from '@nestjs/common';
import { IAnnouncementRepository, IAnnouncementRepositoryToken } from 'src/application/repository-interfaces/iannouncement.repository-interface';
import { ICreateAnnouncementDto } from 'src/application/dto-interfaces/announcement/create-announcement.dto-interface';
import { IUpdateAnnouncementDto } from 'src/application/dto-interfaces/announcement/update-announcement.dto-interface';
import { IFileRelationRepository, IFileRelationRepositoryToken } from 'src/application/repository-interfaces/ifile-relation.repository-interface';

@Injectable()
export class AnnouncementManagementUseCase {
    constructor(
        @Inject(IAnnouncementRepositoryToken)
        private repo: IAnnouncementRepository,
        @Inject(IFileRelationRepositoryToken)
        private fileRelationRepo: IFileRelationRepository
    ) { }


    async create(dto: ICreateAnnouncementDto) {
        return await this.repo.create(dto);
    }

    async update(id: string, dto: IUpdateAnnouncementDto) {
        return await this.repo.update(id, dto);
    }

    async findById(id: string) {

        const announcement = await this.repo.findById(id);
        if (!announcement)
            return null

        const announcementImages = await this.fileRelationRepo.findByRelationId("announcement", announcement?.id as string)
        announcement.images = announcementImages
        return announcement
    }



    async findAll(hoa_id: string, limit: number, offset: number) {

        const announcements = await this.repo.findAll(hoa_id, limit, offset)

        for await (const announcement of announcements) {
            const announcementImages = await this.fileRelationRepo.findByRelationId("announcement", announcement?.id as string)
            announcement.images = announcementImages
        }

        return announcements
    }

    async delete(id: string) {
        return await this.repo.delete(id)
    }


}