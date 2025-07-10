/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Inject, Injectable } from '@nestjs/common';
import { ISpecialAssessmentRepository, ISpecialAssessmentRepositoryToken } from 'src/application/repository-interfaces/ispecial-assessment.repository-interface';
import { ICreateSpecialAssessmentDto } from 'src/application/dto-interfaces/special-assessments/create-assessment.dto-interface';
import { IUpdateSpecialAssessmentDto } from 'src/application/dto-interfaces/special-assessments/update-assessment.dto-interface';
import { IFileRelationRepository, IFileRelationRepositoryToken } from 'src/application/repository-interfaces/ifile-relation.repository-interface';

@Injectable()
export class SpecialAssessmentManagementUseCase {
    constructor(
        @Inject(ISpecialAssessmentRepositoryToken)
        private repo: ISpecialAssessmentRepository,
        @Inject(IFileRelationRepositoryToken)
        private fileRelationRepo: IFileRelationRepository
    ) { }


    async create(dto: ICreateSpecialAssessmentDto) {

        const specialAssessment = await this.repo.create(dto);

        if (dto.file_id && dto.file_id.length > 0)
            await this.fileRelationRepo.findByRelationIdAndCreateOrReplace('specialassessment', specialAssessment.id, dto.file_id);

        return this.repo.findById(specialAssessment.id)

    }

    async update(id: string, dto: IUpdateSpecialAssessmentDto) {

        const specialAssessment = await this.repo.update(id, dto);

        if (dto.file_id && dto.file_id.length > 0)
            await this.fileRelationRepo.findByRelationIdAndCreateOrReplace('specialassessment', specialAssessment.id, dto.file_id);

        return this.repo.findById(specialAssessment.id)
    }

    async findById(id: string) {

        const specialAssessment = await this.repo.findById(id);
        if (!specialAssessment)
            return null

        const specialAssessmentImages = await this.fileRelationRepo.findByRelationId("specialassessment", specialAssessment?.id as string)
        specialAssessment.images = specialAssessmentImages
        return specialAssessment

    }

    async findAll(hoa_id: string) {

        const specialAssessments = await this.repo.findAll(hoa_id)

        const specialAssessmentIds = specialAssessments.map(specialAssessment => specialAssessment.id);

        const filesMap = await this.fileRelationRepo.findByRelationsIds('specialassessment', specialAssessmentIds)


        if (filesMap.size > 0)
            for (const specialAssessment of specialAssessments) {
                let images = []
                const fileImagesMap = filesMap.get(specialAssessment.id)

                if (fileImagesMap) {
                    images = fileImagesMap.map(image => image.file.id)
                }

                specialAssessment.images = images
            }

        return specialAssessments

    }

    async delete(id: string) {
        return await this.repo.delete(id)
    }


}