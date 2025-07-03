import { Inject, Injectable } from '@nestjs/common';
import { ICreateCommonAreaDto } from 'src/application/dto-interfaces/common-area/create-common-area.dto-interface';
import { IUpdateCommonAreaDto } from 'src/application/dto-interfaces/common-area/update-common-area.dto-interface';
import { ICommonAreaRepository, ICommonAreaRepositoryToken } from 'src/application/repository-interfaces/icommon-area.repository-interface';
import { IFileRelationRepository, IFileRelationRepositoryToken } from 'src/application/repository-interfaces/ifile-relation.repository-interface';

@Injectable()
export class CommonAreaManagementUseCase {
    constructor(
        @Inject(ICommonAreaRepositoryToken)
        private repo: ICommonAreaRepository,
        @Inject(IFileRelationRepositoryToken)
        private fileRelationRepo: IFileRelationRepository
    ) { }


    async create(dto: ICreateCommonAreaDto) {
        return await this.repo.create(dto);
    }

    async update(id: string, dto: IUpdateCommonAreaDto) {
        return await this.repo.update(id, dto);
    }

    async findById(id: string) {
        const commonArea = await this.repo.findById(id);
        if (!commonArea)
            return null

        const commonAreaImages = await this.fileRelationRepo.findByRelationId("commonarea", commonArea?.id as string)
        commonArea.images = commonAreaImages
        return commonArea
    }

    async findAll(condominium_id: string) {

        const commonAreas = await this.repo.findAll(condominium_id)

        const commonAreaIds = commonAreas.map(commonArea => commonArea.id);

        const filesMap = await this.fileRelationRepo.findByRelationsIds('commonarea', commonAreaIds)

        if (filesMap.size > 0)
            for (const commonArea of commonAreas) {
                let images = []
                const fileImagesMap = filesMap.get(commonArea.id)

                if (fileImagesMap) {
                    images = fileImagesMap.map(image => image.file.id)
                }

                commonArea.images = images
            }

        return commonAreas

    }

    async delete(id: string) {
        return await this.repo.delete(id)
    }
}