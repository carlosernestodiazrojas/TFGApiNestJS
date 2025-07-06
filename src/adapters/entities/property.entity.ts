import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Condominium } from './condominium.entity';
import { PropertyModel } from 'src/domain/model-interfaces/property.model';
import { User } from './user.entity';

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

    @Column({ type: 'varchar', default: 'interior' })
    property_type: string;

    @Column({ type: 'boolean', default: true })
    has_storage_room: boolean;

    @Column({ type: 'boolean', default: true })
    has_parking_space: boolean;

    @Column({ type: 'boolean', default: true })
    current_on_payments: boolean;

    @ManyToOne(() => Condominium, condominium => condominium.properties)
    @JoinColumn({ name: 'condominium_id' })
    condominium: Condominium;

    @OneToOne(() => User, user => user.property)
    user: User;

}