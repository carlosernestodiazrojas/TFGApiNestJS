import { ICreateAnnouncementDto } from '../../application/dto-interfaces/announcement/create-announcement.dto-interface';
import { IUpdateAnnouncementDto } from '../../application/dto-interfaces/announcement/update-announcement.dto-interface';
import { IAnnouncementVM } from '../vm-interfaces/announcement.vm-interface';

export const IAnnouncementRepositoryToken = 'IAnnouncementRepository';

export interface IAnnouncementRepository {
    findById(id: string): Promise<IAnnouncementVM | null>;
    findAll(hoa_id: string): Promise<IAnnouncementVM[]>;
    create(dto: ICreateAnnouncementDto): Promise<IAnnouncementVM>;
    update(id: string, dto: IUpdateAnnouncementDto): Promise<IAnnouncementVM>;
    delete(id: string): Promise<void>;
}