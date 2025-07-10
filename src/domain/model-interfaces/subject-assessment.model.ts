/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { MeetingSubjectModel } from "./meeting-subject.model";
import { SpecialAssessmentModel } from "./special-assessment.model";

export interface SubjectAssessmentModel {
    id: string;
    assessment: SpecialAssessmentModel
    subject: MeetingSubjectModel
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    deleted_at: string;
}