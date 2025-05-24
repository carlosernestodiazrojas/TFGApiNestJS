import { HoaModel } from "./hoa.model";

export interface CondominiumModel {
    id: string;
    name: string;
    description: string;
    address: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    deleted_at: string;
    hoa: HoaModel;
}