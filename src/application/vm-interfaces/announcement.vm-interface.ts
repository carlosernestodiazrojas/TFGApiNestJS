

export interface IAnnouncementVM {
    id: string;
    title: string;
    description: string;
    is_deleted: boolean;
    from: string;
    to: string;
    images: string[];
    imagesUrls: string[];
    setImagesUrl: (imagesUrls: string[]) => void;
    created: string;
    updated: string;
}