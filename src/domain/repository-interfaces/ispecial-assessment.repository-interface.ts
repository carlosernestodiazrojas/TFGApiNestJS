import { SpecialAssessmentVM } from 'src/common/vm/special-assessment.vm';
import { CreateSpecialAssessmentDtoInterface } from '../dto-interfaces/special-assessments/create-assessment.dto-interface';
import { UpdateSpecialAssessmentDtoInterface } from '../dto-interfaces/special-assessments/update-assessment.dto-interface';

export const ISpecialAssessmentRepositoryToken = 'ISpecialAssessmentRepository';

export interface ISpecialAssessmentRepository {
    findByEmail(email: string): Promise<SpecialAssessmentVM | null>;
    findById(id: string): Promise<SpecialAssessmentVM | null>;
    findAll(): Promise<SpecialAssessmentVM[]>;
    create(dto: CreateSpecialAssessmentDtoInterface): Promise<SpecialAssessmentVM>;
    update(id: string, dto: UpdateSpecialAssessmentDtoInterface): Promise<SpecialAssessmentVM>;
    delete(id: string): Promise<void>;
}