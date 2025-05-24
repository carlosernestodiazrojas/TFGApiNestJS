import { CondominiumVM } from 'src/common/vm/condominium.vm';
import { CreateCondominiumDtoInterface } from '../dto-interfaces/condominium/create-condominium.dto-interface';
import { UpdateCondominiumDtoInterface } from '../dto-interfaces/condominium/update-condominium.dto-interface';

export const ICondominiumRepositoryToken = 'ICondominiumRepository';

export interface ICondominiumRepository {
    findByEmail(email: string): Promise<CondominiumVM | null>;
    findById(id: string): Promise<CondominiumVM | null>;
    findAll(): Promise<CondominiumVM[]>;
    create(dto: CreateCondominiumDtoInterface): Promise<CondominiumVM>;
    update(id: string, dto: UpdateCondominiumDtoInterface): Promise<CondominiumVM>;
    delete(id: string): Promise<void>;
}