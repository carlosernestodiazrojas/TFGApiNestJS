import { AnnouncementVM } from 'src/common/vm/announcement.vm';
import { CreateAnnouncementDtoInterface } from '../dto-interfaces/announcement/create-announcement.dto-interface';
import { UpdateAnnouncementDtoInterface } from '../dto-interfaces/announcement/update-announcement.dto-interface';

export const IAnnouncementRepositoryToken = 'IAnnouncementRepository';

export interface IAnnouncementRepository {
    findByEmail(email: string): Promise<AnnouncementVM | null>;
    findById(id: string): Promise<AnnouncementVM | null>;
    findAll(): Promise<AnnouncementVM[]>;
    create(dto: CreateAnnouncementDtoInterface): Promise<AnnouncementVM>;
    update(id: string, dto: UpdateAnnouncementDtoInterface): Promise<AnnouncementVM>;
    delete(id: string): Promise<void>;
}