import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Hoa } from './hoa.entity';
import { Condominium } from './condominium.entity';

@Entity('common_areas')
export class CommonArea {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'boolean' })
    is_bookable: boolean;

    @Column({ type: 'integer' })
    daily_capacity: number;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @Column({ type: 'boolean' })
    is_deleted: boolean;

    @DeleteDateColumn()
    deleted_at: string;

    @ManyToOne(() => Condominium, condominium => condominium.common_areas)
    @JoinColumn({ name: 'condominium_id' })
    condominium: Condominium;


}