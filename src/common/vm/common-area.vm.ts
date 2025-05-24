export class CommonAreaVM {
    constructor(
        id: string,
        name: string,
        description: string,
        is_bookable: boolean,
        daily_capacity: number,
        is_deleted: boolean
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.is_bookable = is_bookable
        this.daily_capacity = daily_capacity
        this.is_deleted = is_deleted
    }
    id: string;
    name: string;
    description: string;
    is_bookable: boolean;
    daily_capacity: number;
    is_deleted: boolean;
}