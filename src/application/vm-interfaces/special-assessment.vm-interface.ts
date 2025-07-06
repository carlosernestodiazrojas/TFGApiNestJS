export interface ISpecialAssessmentVM {

    id: string;
    title: string;
    description: string;
    is_votable: boolean;
    total_amount: number;
    individual_amount: number;
    is_approved: boolean;
    is_deleted: boolean;
    images: string[];
    imagesUrls: string[];
    setImagesUrl: (imagesUrls: string[]) => void;
    created: string;
    updated: string;
}