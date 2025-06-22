import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Hoa } from './hoa.entity';
import { CommonArea } from './common_area.entity';
import { Property } from './property.entity';

@Entity('condominiums')
export class Condominium implements Condominium {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'text' })
    address: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @Column({ type: 'boolean' })
    is_deleted: boolean;

    @DeleteDateColumn()
    deleted_at: string;

    @ManyToOne(() => Hoa, hoa => hoa.condominiums)
    @JoinColumn({ name: 'hoa_id' })
    hoa: Hoa;

    @OneToMany(() => CommonArea, common_area => common_area.condominium)
    common_areas: CommonArea[];

    @OneToMany(() => Property, property => property.condominium)
    properties: Property[];

}