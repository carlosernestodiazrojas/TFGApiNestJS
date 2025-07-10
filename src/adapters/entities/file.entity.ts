/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { FileModel } from 'src/domain/model-interfaces/file.model';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { FileRelation } from './file_relations.entity';

@Entity('files')
export class FileEntity implements FileModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    sha256: string;

    @Column()
    mimetype: string;

    @Column()
    extension: string;

    @Column()
    size: number;

    @Column()
    originalName: string;

    @Column()
    url: string;

    @CreateDateColumn()
    created_at: string;

    @OneToMany(() => FileRelation, entity => entity.file)
    entities: FileRelation[];

}
