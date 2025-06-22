import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Hoa } from './hoa.entity';
import { Voting } from './voting.entity';
import { User } from './user.entity';
import { Incidence } from './incidence.entity';
import { MeetingSubject } from './meeting_subject.entity';
import { SubjectIncidenceModel } from 'src/domain/model-interfaces/subject-incidence.model';

@Entity('subject_incidences')
export class SubjectIncidence implements SubjectIncidenceModel {
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

    @ManyToOne(() => Incidence, incidence => incidence.subject_incidences)
    @JoinColumn({ name: 'incidence_id' })
    incidence: Incidence;

    @ManyToOne(() => MeetingSubject, subject => subject.subject_incidences)
    @JoinColumn({ name: 'meeting_subject_id' })
    subject: MeetingSubject;


}