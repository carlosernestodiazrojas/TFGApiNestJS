import { Inject, Injectable } from '@nestjs/common';
import { ICondominiumRepository, ICondominiumRepositoryToken } from 'src/application/repository-interfaces/icondominium.repository-interface';
import { IFileRelationRepository, IFileRelationRepositoryToken } from 'src/application/repository-interfaces/ifile-relation.repository-interface';
import { ICreateCondominiumDto } from 'src/application/dto-interfaces/condominium/create-condominium.dto-interface';
import { IUpdateCondominiumDto } from 'src/application/dto-interfaces/condominium/update-condominium.dto-interface';

@Injectable()
export class CondominiumManagementUseCase {
    constructor(
        @Inject(ICondominiumRepositoryToken)
        private repo: ICondominiumRepository,
        @Inject(IFileRelationRepositoryToken)
        private fileRelationRepo: IFileRelationRepository
    ) { }


    async create(dto: ICreateCondominiumDto) {

        const condominium = await this.repo.create(dto);

        if (dto.file_id && dto.file_id.length > 0)
            await this.fileRelationRepo.findByRelationIdAndCreateOrReplace('condominium', condominium.id, dto.file_id);

        return this.repo.findById(condominium.id)

    }

    async update(id: string, dto: IUpdateCondominiumDto) {
        const condominium = await this.repo.update(id, dto);

        if (dto.file_id && dto.file_id.length > 0)
            await this.fileRelationRepo.findByRelationIdAndCreateOrReplace('condominium', condominium.id, dto.file_id);

        return this.repo.findById(condominium.id)
    }

    async findById(id: string) {
        const condominium = await this.repo.findById(id);
        if (!condominium)
            return null

        const condominiumImages = await this.fileRelationRepo.findByRelationId("condominium", condominium?.id as string)
        condominium.images = condominiumImages
        return condominium;

    }

    async findAll(hoa_id: string) {
        const condominiums = await this.repo.findAll(hoa_id)


        const condominiumIds = condominiums.map(condominium => condominium.id);

        const filesMap = await this.fileRelationRepo.findByRelationsIds('condominium', condominiumIds)

        if (filesMap.size > 0)
            for (const condominium of condominiums) {
                let images = []
                const fileImagesMap = filesMap.get(condominium.id)

                if (fileImagesMap) {
                    images = fileImagesMap.map(image => image.file.id)
                }

                condominium.images = images
            }

        return condominiums
    }

    async delete(id: string) {
        return await this.repo.delete(id)
    }


}