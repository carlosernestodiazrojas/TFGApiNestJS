
export class VotingVM {
    constructor(
        id: string,
        title: string,
        description: string,
        is_deleted: boolean,
        voting_entity_type: string,
        voting_entity_id: string,
        is_started: boolean,
        is_finished: boolean
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.is_deleted = is_deleted
        this.voting_entity_type = voting_entity_type
        this.voting_entity_id = voting_entity_id
        this.is_started = is_started
        this.is_finished = is_finished
    }
    id: string;
    title: string;
    description: string;
    voting_entity_type: string;
    voting_entity_id: string;
    is_started: boolean;
    is_finished: boolean;
    is_deleted: boolean;

}