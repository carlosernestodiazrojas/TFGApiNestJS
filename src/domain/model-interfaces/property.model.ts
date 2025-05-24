import { CondominiumModel } from "./condominium.model";

export interface PropertyModel {
    id: string;
    property_identifier: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    deleted_at: string;
    condominium: CondominiumModel;
}