import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Hoa } from './hoa.entity';
import { SubjectAssessment } from './subject_assessment.entity';
import { SpecialAssessmentModel } from 'src/domain/model-interfaces/special-assessment.model';

@Entity('special_assessments')
export class SpecialAssessment implements SpecialAssessmentModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'boolean' })
    is_votable: boolean;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    total_amount: boolean;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    individual_amount: boolean;

    @Column({ type: 'boolean' })
    is_approved: boolean;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @Column({ type: 'boolean' })
    is_deleted: boolean;

    @DeleteDateColumn()
    deleted_at: string;

    @ManyToOne(() => Hoa, hoa => hoa.special_assessments)
    @JoinColumn({ name: 'hoa_id' })
    hoa: Hoa;

    @OneToMany(() => SubjectAssessment, subject_assessment => subject_assessment.assessment)
    subject_assessments: SubjectAssessment[];


}