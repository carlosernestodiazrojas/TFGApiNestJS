
export interface IVotingVM {
    id: string;
    title: string;
    description: string;
    voting_entity_type: string;
    voting_entity_id: string;
    is_started: boolean;
    is_finished: boolean;
    is_deleted: boolean;
}