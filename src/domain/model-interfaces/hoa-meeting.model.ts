import { HoaModel } from "./hoa.model";

export interface HoaMeetingModel {
    id: string;
    name: string;
    description: string;
    is_ordinary: boolean;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    deleted_at: string;
    hoa: HoaModel;
}