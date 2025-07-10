/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

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