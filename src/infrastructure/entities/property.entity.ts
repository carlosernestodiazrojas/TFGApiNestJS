import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Condominium } from './condominium.entity';
import { PropertyModel } from 'src/domain/models/property.model';

@Entity('properties')
export class Property implements PropertyModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    property_identifier: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @Column({ type: 'boolean' })
    is_deleted: boolean;

    @DeleteDateColumn()
    deleted_at: string;

    @ManyToOne(() => Condominium, condominium => condominium.properties)
    @JoinColumn({ name: 'condominium_id' })
    condominium: Condominium;

}