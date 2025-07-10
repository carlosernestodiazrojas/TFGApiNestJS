/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Hoa } from './hoa.entity';
import { VotingResult } from './voting_result.entity';
import { VotingModel } from 'src/domain/model-interfaces/voting.model';

@Entity('votings')
export class Voting implements VotingModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'varchar' })
    voting_entity_type: string;

    @Column({ type: 'uuid' })
    voting_entity_id: string;

    @Column({ type: 'boolean' })
    is_started: boolean;

    @Column({ type: 'timestamp without time zone' })
    started_at: string;

    @Column({ type: 'boolean' })
    is_finished: boolean;

    @Column({ type: 'timestamp without time zone' })
    finished_at: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @Column({ type: 'boolean' })
    is_deleted: boolean;

    @DeleteDateColumn()
    deleted_at: string;

    @OneToMany(() => VotingResult, result => result.voting)
    voting_results: VotingResult[];


}