import { VotingVM } from 'src/common/vm/voting.vm';
import { CreateVotingDtoInterface } from '../dto-interfaces/voting/create-voting.dto-interface';
import { UpdateVotingDtoInterface } from '../dto-interfaces/voting/update-voting.dto-interface';

export const IVotingRepositoryToken = 'IVotingRepository';

export interface IVotingRepository {
    findByEmail(email: string): Promise<VotingVM | null>;
    findById(id: string): Promise<VotingVM | null>;
    findAll(): Promise<VotingVM[]>;
    create(dto: CreateVotingDtoInterface): Promise<VotingVM>;
    update(id: string, dto: UpdateVotingDtoInterface): Promise<VotingVM>;
    delete(id: string): Promise<void>;
}