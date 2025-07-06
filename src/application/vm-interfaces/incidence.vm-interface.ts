export interface IIncidenceVM {
    id: string;
    name: string;
    description: string;
    is_votable: boolean;
    is_solved: boolean;
    solved_at: string;
    is_deleted: boolean;
    images: string[];
    imagesUrls: string[];
    setImagesUrl: (imagesUrls: string[]) => void;
    created: string;
    updated: string;
}