/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

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