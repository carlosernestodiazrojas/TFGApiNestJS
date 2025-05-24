export class CondominiumVM {
    constructor(
        id: string,
        name: string,
        description: string,
        address: string,
        is_deleted: boolean
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.address = address
        this.is_deleted = is_deleted
    }
    id: string;
    name: string;
    description: string;
    address: string;
    is_deleted: boolean;
}