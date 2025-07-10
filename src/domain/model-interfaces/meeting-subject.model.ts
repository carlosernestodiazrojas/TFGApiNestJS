/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { HoaMeetingModel } from "./hoa-meeting.model";

export interface MeetingSubjectModel {
    id: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    deleted_at: string;
    meeting: HoaMeetingModel
}