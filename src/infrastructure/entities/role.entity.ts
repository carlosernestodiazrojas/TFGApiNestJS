import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { RoleModel } from 'src/domain/models/role.model';

import { RoleName } from 'src/common/enums/role-name.enum';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'integer', nullable: true, unique: true })
    code: number;

    @Column({ type: 'enum', enum: RoleName, unique: true })
    name: RoleName;

    @OneToMany(() => User, user => user.role)
    users: User[];
}