import { FileModel } from 'src/domain/model-interfaces/file.model';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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
}
