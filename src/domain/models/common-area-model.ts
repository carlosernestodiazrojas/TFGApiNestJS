
export interface CommonAreaModel {
    id: string;
    name: string;
    description: string;
    is_bookable: boolean;
    daily_capacity: number;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    deleted_at: string;
    condominium_id: string;
}