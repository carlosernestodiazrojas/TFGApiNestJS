import { Inject, Injectable } from '@nestjs/common';
import { ISpecialAssessmentRepository, ISpecialAssessmentRepositoryToken } from 'src/application/repository-interfaces/ispecial-assessment.repository-interface';
import { ICreateSpecialAssessmentDto } from 'src/application/dto-interfaces/special-assessments/create-assessment.dto-interface';
import { IUpdateSpecialAssessmentDto } from 'src/application/dto-interfaces/special-assessments/update-assessment.dto-interface';

@Injectable()
export class SpecialAssessmentManagementUseCase {
    constructor(
        @Inject(ISpecialAssessmentRepositoryToken)
        private repo: ISpecialAssessmentRepository
    ) { }


    async create(dto: ICreateSpecialAssessmentDto) {
        return await this.repo.create(dto);
    }

    async update(id: string, dto: IUpdateSpecialAssessmentDto) {
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