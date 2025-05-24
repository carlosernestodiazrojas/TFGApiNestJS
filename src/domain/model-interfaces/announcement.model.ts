import { HoaModel } from "./hoa.model";

export interface AnnouncementModel {
    id: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    deleted_at: string;
    hoa: HoaModel;
}