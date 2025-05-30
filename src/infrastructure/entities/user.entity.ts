import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Role } from './role.entity';
import { VotingResult } from './voting_result.entity';
import { UserModel } from 'src/domain/model-interfaces/user.model';
import { Hoa } from './hoa.entity';

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

    @ManyToOne(() => Role, role => role.users)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @OneToMany(() => VotingResult, result => result.voting)
    voting_results: VotingResult[];

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

}