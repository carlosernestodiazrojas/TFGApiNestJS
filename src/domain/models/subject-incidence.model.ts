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