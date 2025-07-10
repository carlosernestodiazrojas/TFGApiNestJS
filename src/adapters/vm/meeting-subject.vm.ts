/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { IMeetingSubjectVM } from "src/application/vm-interfaces/meeting-subject.vm-interface";

export class MeetingSubjectVM implements IMeetingSubjectVM {
    constructor(
        id: string,
        title: string,
        description: string,
        is_deleted: boolean
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.is_deleted = is_deleted
    }
    id: string;
    title: string;
    description: string;
    is_deleted: boolean;
}