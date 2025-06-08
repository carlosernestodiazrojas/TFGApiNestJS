import { CondominiumModel } from "./condominium.model";

export interface PropertyModel {
    id: string;
    property_identifier: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    deleted_at: string;
    property_type: string;
    has_storage_room: boolean;
    has_parking_space: boolean;
    current_on_payments: boolean;
    condominium: CondominiumModel;
}