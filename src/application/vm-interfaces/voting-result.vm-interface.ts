/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

export interface IVotingResultVM {
    id: string;
    approve: boolean;
    is_deleted: boolean;
    voting_id: string
    user_id: string;
}