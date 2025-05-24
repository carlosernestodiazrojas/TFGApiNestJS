import { UserModel } from "./user.model";
import { VotingModel } from "./voting.model";

export interface VotingResultModel {
    id: string;
    approve: boolean;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    deleted_at: string;
    voting: VotingModel
    user: UserModel

}