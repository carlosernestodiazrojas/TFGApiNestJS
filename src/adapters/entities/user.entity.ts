/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Role } from './role.entity';
import { VotingResult } from './voting_result.entity';
import { UserModel } from 'src/domain/model-interfaces/user.model';
import { Hoa } from './hoa.entity';
import { Property } from './property.entity';

@Entity('users')
export class User implements UserModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
        nullable: true
    })
    name: string;

    @Column({
        nullable: true
    })
    last_name: string;

    @Column({
        nullable: true
    })
    property_id: string;

    @ManyToOne(() => Role, role => role.users)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @OneToMany(() => VotingResult, result => result.voting)
    voting_results: VotingResult[];

    @OneToOne(
        () => Property,
        property => property.user,
        {
            nullable: true,
            onDelete: 'SET NULL'
        }
    )
    @JoinColumn({ name: 'property_id' })
    property: Property;

    @ManyToOne(
        () => Hoa,
        hoa => hoa.users,
        {
            nullable: true,
            onDelete: 'SET NULL'
        }
    )
    @JoinColumn({ name: 'hoa_id' })
    hoa: Hoa;

    @Column({
        default: true
    })
    active: boolean;

}