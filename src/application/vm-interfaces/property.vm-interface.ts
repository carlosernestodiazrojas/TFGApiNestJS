export interface IPropertyVM {
    id: string;
    property_identifier: string;
    is_deleted: boolean;
    property_type: string;
    has_storage_room: boolean;
    has_parking_space: boolean;
    current_on_payments: boolean;
}