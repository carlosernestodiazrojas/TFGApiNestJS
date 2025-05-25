import { CondominiumVM } from 'src/common/vm/condominium.vm';
import { CreateCondominiumDtoInterface } from '../dto-interfaces/condominium/create-condominium.dto-interface';
import { UpdateCondominiumDtoInterface } from '../dto-interfaces/condominium/update-condominium.dto-interface';

export const ICondominiumRepositoryToken = 'ICondominiumRepository';

export interface ICondominiumRepository {
    findById(id: string): Promise<CondominiumVM | null>;
    findAll(hoa_id: string): Promise<CondominiumVM[]>;
    create(dto: CreateCondominiumDtoInterface): Promise<CondominiumVM>;
    update(id: string, dto: UpdateCondominiumDtoInterface): Promise<CondominiumVM>;
    delete(id: string): Promise<void>;
}