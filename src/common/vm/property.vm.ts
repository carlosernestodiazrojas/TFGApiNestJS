export class PropertyVM {
    constructor(
        id: string,
        property_identifier: string,
        is_deleted: boolean
    ) {
        this.id = id
        this.property_identifier = property_identifier
        this.is_deleted = is_deleted
    }
    id: string;
    property_identifier: string;
    is_deleted: boolean;
}