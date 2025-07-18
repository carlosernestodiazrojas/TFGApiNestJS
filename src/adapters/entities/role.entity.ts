/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { RoleModel } from 'src/domain/model-interfaces/role.model';

import { RoleName } from 'src/common/enums/role-name.enum';

@Entity('roles')
export class Role implements RoleModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'integer', nullable: true, unique: true })
    code: number;

    @Column({ type: 'enum', enum: RoleName, unique: true })
    name: RoleName;

    @OneToMany(() => User, user => user.role)
    users: User[];
}