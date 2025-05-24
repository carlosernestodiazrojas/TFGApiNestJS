export class SubjectIncidenceVM {
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