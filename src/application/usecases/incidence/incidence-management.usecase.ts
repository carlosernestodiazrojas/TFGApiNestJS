import { Inject, Injectable } from '@nestjs/common';
import { IIncidenceRepository, IIncidenceRepositoryToken } from 'src/application/repository-interfaces/iincidence.repository-interface';
import { IUpdateIncidenceDto } from 'src/application/dto-interfaces/incidence/update-incidence.dto-interface';
import { ICreateIncidenceDto } from 'src/application/dto-interfaces/incidence/create-incidence.dto-interface';
import { IFileRelationRepository, IFileRelationRepositoryToken } from 'src/application/repository-interfaces/ifile-relation.repository-interface';

@Injectable()
export class IncidenceManagementUseCase {
    constructor(
        @Inject(IIncidenceRepositoryToken)
        private repo: IIncidenceRepository,
        @Inject(IFileRelationRepositoryToken)
        private fileRelationRepo: IFileRelationRepository
    ) { }


    async create(dto: ICreateIncidenceDto) {
        return await this.repo.create(dto);
    }

    async update(id: string, dto: IUpdateIncidenceDto) {
        return await this.repo.update(id, dto);
    }

    async findById(id: string) {

        const incidence = await this.repo.findById(id);
        if (!incidence)
            return null

        const incidenceImages = await this.fileRelationRepo.findByRelationId("incidence", incidence?.id as string)
        incidence.images = incidenceImages

        return incidence

    }

    async findAll(hoa_id: string) {

        const incidences = await this.repo.findAll(hoa_id)

        for await (const incidence of incidences) {
            const incidenceImages = await this.fileRelationRepo.findByRelationId("incidence", incidence?.id as string)
            incidence.images = incidenceImages
        }

        const incidenceIds = incidences.map(incidence => incidence.id);

        const filesMap = await this.fileRelationRepo.findByRelationsIds('incidence', incidenceIds)

        if (filesMap.size > 0)
            for (const incidence of incidences) {
                let images = []
                const fileImagesMap = filesMap.get(incidence.id)

                if (fileImagesMap) {
                    images = fileImagesMap.map(image => image.file.id)
                }

                incidence.images = images
            }

        return incidences
    }

    async delete(id: string) {
        return await this.repo.delete(id)
    }


}