import { IUserVM } from "./user.vm-interface";

interface StatisticItem {
    count: number;
    percentage: number;
}

interface PropertyTypeStatistics {
    interior: StatisticItem;
    exterior: StatisticItem;
    atico: StatisticItem;
    bajo: StatisticItem;
    local: StatisticItem;
}

export interface PropertyStatistics {
    total_properties: number;
    storage_room: StatisticItem;
    parking_space: StatisticItem;
    current_on_payments: StatisticItem;
    property_types: PropertyTypeStatistics;
}

export interface IHoaVM {
    id: string;
    name: string;
    address: string;
    images: string[];
    president_id: string;
    admin_id: string;
    imagesUrls: string[];
    statistics?: PropertyStatistics
    setImagesUrl: (imagesUrls: string[]) => void;
    setStatistics: (statistics: PropertyStatistics) => void;
}