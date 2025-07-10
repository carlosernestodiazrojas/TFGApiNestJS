/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { ISubjectIncidenceVM } from "src/application/vm-interfaces/subject-incidence.vm-interface";

export class SubjectIncidenceVM implements ISubjectIncidenceVM {
    constructor(
        id: string,
        incidence_id: string,
        subject_id: string,
        is_deleted: boolean
    ) {
        this.id = id
        this.incidence_id = incidence_id
        this.subject_id = subject_id
        this.is_deleted = is_deleted
    }
    id: string;
    incidence_id: string;
    subject_id: string;
    is_deleted: boolean;
}