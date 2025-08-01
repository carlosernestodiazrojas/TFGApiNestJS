/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

export interface VotingModel {
    id: string;
    title: string;
    description: string;
    voting_entity_type: string;
    voting_entity_id: string;
    is_started: boolean;
    started_at: string;
    is_finished: boolean;
    finished_at: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    deleted_at: string;

}