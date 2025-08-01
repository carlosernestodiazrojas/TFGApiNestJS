/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Hoa } from './hoa.entity';
import { Voting } from './voting.entity';
import { User } from './user.entity';
import { VotingResultModel } from 'src/domain/model-interfaces/voting-result.model';

@Entity('voting_results')
export class VotingResult implements VotingResultModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'boolean' })
    approve: boolean;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @Column({ type: 'boolean' })
    is_deleted: boolean;

    @DeleteDateColumn()
    deleted_at: string;

    @ManyToOne(() => Voting, voting => voting.voting_results)
    @JoinColumn({ name: 'voting_id' })
    voting: Voting;

    @ManyToOne(() => User, user => user.voting_results)
    @JoinColumn({ name: 'user_id' })
    user: User;


}