export class SubjectAssessmentVMs implements SubjectAssessmentVMs {
    constructor(
        id: string,
        assessment_id: string,
        subject_id: string,
        is_deleted: boolean
    ) {
        this.id = id
        this.assessment_id = assessment_id
        this.subject_id = subject_id
        this.is_deleted = is_deleted
    }
    id: string;
    assessment_id: string;
    subject_id: string;
    is_deleted: boolean;
}