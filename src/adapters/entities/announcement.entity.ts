import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Hoa } from './hoa.entity';
import { AnnouncementModel } from 'src/domain/model-interfaces/announcement.model';

@Entity('announcements')
export class Announcement implements AnnouncementModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @Column({ type: 'boolean' })
    is_deleted: boolean;

    @DeleteDateColumn()
    deleted_at: string;

    @Column({
        type: 'timestamp without time zone',
        default: () => 'NOW()',
    })
    from: string;

    @Column({
        type: 'timestamp without time zone',
        default: () => `NOW() + INTERVAL '10 days'`,
    })
    to: string;

    @ManyToOne(() => Hoa, hoa => hoa.announcements)
    @JoinColumn({ name: 'hoa_id' })
    hoa: Hoa;


}