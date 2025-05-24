import { HoaMeetingVM } from 'src/common/vm/hoa-meeting.vm';
import { CreateHoaMeetingDtoInterface } from '../dto-interfaces/hoa-meeting/create-meeting.dto-interface';
import { UpdateHoaMeetingDtoInterface } from '../dto-interfaces/hoa-meeting/update-meeting.dto-interface';

export const IHoaMeetingRepositoryToken = 'IHoaMeetingRepository';

export interface IHoaMeetingRepository {
    findByEmail(email: string): Promise<HoaMeetingVM | null>;
    findById(id: string): Promise<HoaMeetingVM | null>;
    findAll(): Promise<HoaMeetingVM[]>;
    create(dto: CreateHoaMeetingDtoInterface): Promise<HoaMeetingVM>;
    update(id: string, dto: UpdateHoaMeetingDtoInterface): Promise<HoaMeetingVM>;
    delete(id: string): Promise<void>;
}