import { Inject, Injectable } from '@nestjs/common';
import { CreateSpecialAssessmentDto } from 'src/application/dtos/special-assessments/create-special-assessment.dto';
import { UpdateSpecialAssessmentDto } from 'src/application/dtos/special-assessments/update-special-assessment.dto';

import { ISpecialAssessmentRepository, ISpecialAssessmentRepositoryToken } from 'src/domain/repository-interfaces/ispecial-assessment.repository-interface';

@Injectable()
export class SpecialAssessmentManagementUseCase {
    constructor(
        @Inject(ISpecialAssessmentRepositoryToken)
        private repo: ISpecialAssessmentRepository
    ) { }


    async create(dto: CreateSpecialAssessmentDto) {
        return await this.repo.create(dto);
    }

    async update(id: string, dto: UpdateSpecialAssessmentDto) {
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