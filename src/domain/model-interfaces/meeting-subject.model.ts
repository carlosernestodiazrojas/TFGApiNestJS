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