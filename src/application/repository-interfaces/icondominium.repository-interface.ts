import { ICreateCondominiumDto } from '../../application/dto-interfaces/condominium/create-condominium.dto-interface';
import { IUpdateCondominiumDto } from '../../application/dto-interfaces/condominium/update-condominium.dto-interface';
import { ICondominiumVM } from '../vm-interfaces/condominium.vm-interface';

export const ICondominiumRepositoryToken = 'ICondominiumRepository';

export interface ICondominiumRepository {
    findById(id: string): Promise<ICondominiumVM | null>;
    findAll(hoa_id: string): Promise<ICondominiumVM[]>;
    create(dto: ICreateCondominiumDto): Promise<ICondominiumVM>;
    update(id: string, dto: IUpdateCondominiumDto): Promise<ICondominiumVM>;
    delete(id: string): Promise<void>;
}