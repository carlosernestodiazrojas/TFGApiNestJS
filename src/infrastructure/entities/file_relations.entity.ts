import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { FileEntity } from './file.entity';

@Entity('file_relations')
export class FileRelation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    relation_entity_type: string;

    @Column({ type: 'uuid' })
    relation_entity_id: string;

    @CreateDateColumn()
    created_at: string;

    @Column({ type: 'boolean' })
    is_deleted: boolean;

    @DeleteDateColumn()
    deleted_at: string;

    @ManyToOne(() => FileEntity, file => file.entities)
    @JoinColumn({ name: 'file_id' })
    file: FileEntity;


}