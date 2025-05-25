
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISpecialAssessmentRepository } from 'src/domain/repository-interfaces/ispecial-assessment.repository-interface';
import { SpecialAssessment } from '../entities/special-assessment.entity';
import { SpecialAssessmentVM } from 'src/common/vm/special-assessment.vm';
import { CreateSpecialAssessmentDto } from 'src/application/dtos/special-assessments/create-special-assessment.dto';
import { UpdateSpecialAssessmentDto } from 'src/application/dtos/special-assessments/update-special-assessment.dto';
import { Hoa } from '../entities/hoa.entity';

@Injectable()
export class SpecialAssessmentRepository implements ISpecialAssessmentRepository {
    constructor(
        @InjectRepository(SpecialAssessment)
        private readonly repo: Repository<SpecialAssessment>,
        @InjectRepository(Hoa)
        private readonly repoHoa: Repository<Hoa>
    ) { }

    private toViewModel(assessment: SpecialAssessment): SpecialAssessmentVM {
        return new SpecialAssessmentVM(
            assessment.id,
            assessment.title,
            assessment.description,
            assessment.is_votable,
            assessment.total_amount,
            assessment.individual_amount,
            assessment.is_approved,
            assessment.is_deleted
        );
    }

    async findById(id: string): Promise<SpecialAssessmentVM | null> {
        const special_assessment = await this.repo.findOne({ where: { id } });
        if (!special_assessment) throw new NotFoundException('Derrama no encontrada');
        return this.toViewModel(special_assessment);
    }

    async findAll(hoa_id: string): Promise<SpecialAssessmentVM[]> {

        const hoa = await this.repoHoa.findOne({ where: { id: hoa_id } });
        if (!hoa) throw new NotFoundException('Comunidad no encontrada');

        const ents = await this.repo.find({ where: { hoa } });
        return ents.map(e => this.toViewModel(e));
    }

    async create(dto: CreateSpecialAssessmentDto): Promise<SpecialAssessmentVM> {

        const { hoa_id } = dto

        const hoa = await this.repoHoa.findOne({ where: { id: hoa_id } });
        if (!hoa) throw new NotFoundException('Comunidad no encontrada');

        const ent = this.repo.create({
            title: dto.title,
            description: dto.description,
            is_deleted: false,
            is_votable: false,
            is_approved: false,
            total_amount: dto.total_amount,
            individual_amount: dto.individual_amount,
            hoa
        });

        const saved = await this.repo.save(ent);
        return this.toViewModel(saved);
    }

    async update(id: string, dto: UpdateSpecialAssessmentDto): Promise<SpecialAssessmentVM> {

        const special_assessment = await this.repo.findOne({ where: { id } });
        if (!special_assessment) throw new NotFoundException('Derrama no encontrada');

        if (dto.title)
            special_assessment.title = dto.title;

        if (dto.description)
            special_assessment.description = dto.description;

        if (dto.is_votable)
            special_assessment.is_votable = dto.is_votable;

        if (dto.is_approved)
            special_assessment.is_approved = dto.is_approved;

        if (dto.individual_amount)
            special_assessment.individual_amount = dto.individual_amount;

        if (dto.total_amount)
            special_assessment.total_amount = dto.total_amount;

        await this.repo.save(special_assessment);

        const updated = await this.repo.findOne({ where: { id } });
        return this.toViewModel(updated as SpecialAssessment);
    }

    async delete(id: string): Promise<void> {

        const special_assessment = await this.repo.findOne({ where: { id } });
        if (!special_assessment) throw new NotFoundException('Derrama no encontrada');

        special_assessment.is_deleted = true;
        special_assessment.deleted_at = new Date().toDateString();
        await this.repo.save(special_assessment);

    }

}
