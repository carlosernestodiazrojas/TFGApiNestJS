/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Hoa } from './hoa.entity';
import { MeetingSubject } from './meeting_subject.entity';
import { HoaMeetingModel } from 'src/domain/model-interfaces/hoa-meeting.model';

@Entity('hoa_meetings')
export class HoaMeeting implements HoaMeetingModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'boolean' })
    is_ordinary: boolean;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @Column({ type: 'boolean' })
    is_deleted: boolean;

    @DeleteDateColumn()
    deleted_at: string;

    @ManyToOne(() => Hoa, hoa => hoa.meetings)
    @JoinColumn({ name: 'hoa_id' })
    hoa: Hoa;

    @OneToMany(() => MeetingSubject, subject => subject.meeting)
    subjects: MeetingSubject[];


}