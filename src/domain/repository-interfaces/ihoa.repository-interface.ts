import { HoaVM } from 'src/common/vm/hoa.vm';
import { CreateHoaDtoInterface } from '../dto-interfaces/hoa/create-hoa.dto-interface';
import { UpdateHoaDtoInterface } from '../dto-interfaces/hoa/update-hoa.dto-interface';

export const IHoaRepositoryToken = 'IHoaRepository';

export interface IHoaRepository {
    findByEmail(email: string): Promise<HoaVM | null>;
    findById(id: string): Promise<HoaVM | null>;
    findAll(): Promise<HoaVM[]>;
    create(dto: CreateHoaDtoInterface): Promise<HoaVM>;
    update(id: string, dto: UpdateHoaDtoInterface): Promise<HoaVM>;
    delete(id: string): Promise<void>;
}