import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { HoaMeeting } from './hoa_meeting.entity';
import { SubjectIncidence } from './subject_incidence.entity';
import { SubjectAssessment } from './subject_assessment.entity';
import { MeetingSubjectModel } from 'src/domain/models/meeting-subject.model';

@Entity('meeting_subjects')
export class MeetingSubject implements MeetingSubjectModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @Column({ type: 'boolean' })
    is_deleted: boolean;

    @DeleteDateColumn()
    deleted_at: string;

    @ManyToOne(() => HoaMeeting, meeting => meeting.subjects)
    @JoinColumn({ name: 'meeting_id' })
    meeting: HoaMeeting;

    @OneToMany(() => SubjectIncidence, subject_incidence => subject_incidence.subject)
    subject_incidences: SubjectIncidence[];

    @OneToMany(() => SubjectAssessment, subject_assessment => subject_assessment.subject)
    subject_assessments: SubjectAssessment[];


}
