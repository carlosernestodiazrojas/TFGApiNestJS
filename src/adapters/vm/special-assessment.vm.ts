import { ISpecialAssessmentVM } from "src/application/vm-interfaces/special-assessment.vm-interface"

export class SpecialAssessmentVM implements ISpecialAssessmentVM {
    constructor(
        id: string,
        title: string,
        description: string,
        is_votable: boolean,
        total_amount: number,
        individual_amount: number,
        is_approved: boolean,
        is_deleted: boolean
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.is_votable = is_votable
        this.total_amount = total_amount
        this.individual_amount = individual_amount
        this.is_approved = is_approved
        this.is_deleted = is_deleted
        this.images = []
        this.imagesUrls = []
    }
    id: string;
    title: string;
    description: string;
    is_votable: boolean;
    total_amount: number;
    individual_amount: number;
    is_approved: boolean;
    is_deleted: boolean;

    images: string[]
    imagesUrls: string[]

    public setImagesUrl(imagesUrls: string[]) {
        this.imagesUrls = imagesUrls
    }
}