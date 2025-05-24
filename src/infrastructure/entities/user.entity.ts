import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Role } from './role.entity';
import { VotingResult } from './voting_result.entity';
import { UserModel } from 'src/domain/models/user.model';

@Entity('users')
export class User implements UserModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => Role, role => role.users)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @OneToMany(() => VotingResult, result => result.voting)
    voting_results: VotingResult[];

}