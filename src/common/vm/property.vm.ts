export class PropertyVM {
    constructor(
        id: string,
        property_identifier: string,
        is_deleted: boolean,
        property_type: string,
        has_storage_room: boolean,
        has_parking_space: boolean,
        current_on_payments: boolean
    ) {
        this.id = id
        this.property_identifier = property_identifier
        this.is_deleted = is_deleted
        this.property_type = property_type;
        this.has_storage_room = has_storage_room;
        this.has_parking_space = has_parking_space;
        this.current_on_payments = current_on_payments;
    }
    id: string;
    property_identifier: string;
    is_deleted: boolean;
    property_type: string;
    has_storage_room: boolean;
    has_parking_space: boolean;
    current_on_payments: boolean;
}