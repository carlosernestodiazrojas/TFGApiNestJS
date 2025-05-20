import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Incidence } from './incidence.entity';
import { Condominium } from './condominium.entity';
import { CommonArea } from './common_area.entity';
import { Announcement } from './announcement.entity';
import { SpecialAssessment } from './special_assessment.entity';
import { HoaMeeting } from './hoa_meeting.entity';

@Entity('hoas')
export class Hoa {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    address: string;

    @OneToMany(() => Incidence, incidence => incidence.hoa)
    incidences: Incidence[];

    @OneToMany(() => Condominium, condominium => condominium.hoa)
    condominiums: Condominium[];

    @OneToMany(() => Announcement, announcement => announcement.hoa)
    announcements: Announcement[];

    @OneToMany(() => SpecialAssessment, special_assessment => special_assessment.hoa)
    special_assessments: SpecialAssessment[];

    @OneToMany(() => HoaMeeting, meeting => meeting.hoa)
    meetings: HoaMeeting[];

}