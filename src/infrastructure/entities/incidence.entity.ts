import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Hoa } from './hoa.entity';
import { SubjectIncidence } from './subject_incidence.entity';
import { IncidenceModel } from 'src/domain/model-interfaces/incidence.model';

@Entity('incidences')
export class Incidence implements IncidenceModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'boolean' })
    is_votable: boolean;

    @Column({ type: 'boolean' })
    is_solved: boolean;

    @Column({ type: 'timestamp without time zone' })
    solved_at: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @Column({ type: 'boolean' })
    is_deleted: boolean;

    @DeleteDateColumn()
    deleted_at: string;

    @ManyToOne(() => Hoa, hoa => hoa.incidences)
    @JoinColumn({ name: 'hoa_id' })
    hoa: Hoa;

    @OneToMany(() => SubjectIncidence, subject_incidence => subject_incidence.incidence)
    subject_incidences: SubjectIncidence[];


}