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