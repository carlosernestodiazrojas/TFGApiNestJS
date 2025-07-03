import { Inject, Injectable } from '@nestjs/common';
import { IAnnouncementRepository, IAnnouncementRepositoryToken } from 'src/application/repository-interfaces/iannouncement.repository-interface';
import { ICreateAnnouncementDto } from 'src/application/dto-interfaces/announcement/create-announcement.dto-interface';
import { IUpdateAnnouncementDto } from 'src/application/dto-interfaces/announcement/update-announcement.dto-interface';
import { IFileRelationRepository, IFileRelationRepositoryToken } from 'src/application/repository-interfaces/ifile-relation.repository-interface';
import { In } from 'typeorm';

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

        const announcementIds = announcements.map(announcement => announcement.id);

        const filesMap = await this.fileRelationRepo.findByRelationsIds('announcement', announcementIds)


        if (filesMap.size > 0)
            for (const announcement of announcements) {
                let images = []
                const fileImagesMap = filesMap.get(announcement.id)

                if (fileImagesMap) {
                    images = fileImagesMap.map(image => image.file.id)
                }

                announcement.images = images
            }

        return announcements
    }

    async delete(id: string) {
        return await this.repo.delete(id)
    }


}