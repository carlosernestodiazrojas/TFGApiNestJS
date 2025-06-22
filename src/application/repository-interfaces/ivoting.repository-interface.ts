import { ICreateVotingDto } from '../../application/dto-interfaces/voting/create-voting.dto-interface';
import { IUpdateVotingDto } from '../../application/dto-interfaces/voting/update-voting.dto-interface';
import { IVotingVM } from '../vm-interfaces/voting.vm-interface';

export const IVotingRepositoryToken = 'IVotingRepository';

export interface IVotingRepository {
    findByEmail(email: string): Promise<IVotingVM | null>;
    findById(id: string): Promise<IVotingVM | null>;
    findAll(): Promise<IVotingVM[]>;
    create(dto: ICreateVotingDto): Promise<IVotingVM>;
    update(id: string, dto: IUpdateVotingDto): Promise<IVotingVM>;
    delete(id: string): Promise<void>;
}