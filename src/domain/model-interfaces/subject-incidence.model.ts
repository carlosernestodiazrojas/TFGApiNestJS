/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { IncidenceModel } from "./incidence.model";
import { MeetingSubjectModel } from "./meeting-subject.model";

export interface SubjectIncidenceModel {
    id: string;
    incidence: IncidenceModel
    subject: MeetingSubjectModel
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    deleted_at: string;
}