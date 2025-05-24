import { IncidenceVM } from 'src/common/vm/incidence.vm';
import { CreateIncidenceDtoInterface } from '../dto-interfaces/incidence/create-incidence.dto-interface';
import { UpdateIncidenceDtoInterface } from '../dto-interfaces/incidence/update-incidence.dto-interface';

export const IIncidenceRepositoryToken = 'IIncidenceRepository';

export interface IIncidenceRepository {
    findByEmail(email: string): Promise<IncidenceVM | null>;
    findById(id: string): Promise<IncidenceVM | null>;
    findAll(): Promise<IncidenceVM[]>;
    create(dto: CreateIncidenceDtoInterface): Promise<IncidenceVM>;
    update(id: string, dto: UpdateIncidenceDtoInterface): Promise<IncidenceVM>;
    delete(id: string): Promise<void>;
}