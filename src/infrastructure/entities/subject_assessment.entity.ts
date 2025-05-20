import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Hoa } from './hoa.entity';
import { Voting } from './voting.entity';
import { User } from './user.entity';
import { Incidence } from './incidence.entity';
import { MeetingSubject } from './meeting_subject.entity';
import { SpecialAssessment } from './special_assessment.entity';

@Entity('subject_assessments')
export class SubjectAssessment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @Column({ type: 'boolean' })
    is_deleted: boolean;

    @DeleteDateColumn()
    deleted_at: string;

    @ManyToOne(() => SpecialAssessment, assessment => assessment.subject_assessments)
    @JoinColumn({ name: 'special_assessment_id' })
    assessment: SpecialAssessment;

    @ManyToOne(() => MeetingSubject, subject => subject.subject_assessments)
    @JoinColumn({ name: 'meeting_subject_id' })
    subject: MeetingSubject;


}