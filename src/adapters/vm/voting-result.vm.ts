import { IVotingResultVM } from "src/application/vm-interfaces/voting-result.vm-interface"

export class VotingResultVM implements IVotingResultVM {
    constructor(
        id: string,
        approve: boolean,
        is_deleted: boolean,
        voting_id: string,
        user_id: string
    ) {
        this.id = id
        this.approve = approve
        this.is_deleted = is_deleted
        this.voting_id = voting_id
        this.user_id = user_id
    }
    id: string;
    approve: boolean;
    is_deleted: boolean;
    voting_id: string
    user_id: string;
}