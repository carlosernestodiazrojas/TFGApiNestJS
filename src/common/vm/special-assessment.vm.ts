export class SpecialAssessmentVM {
    constructor(
        id: string,
        title: string,
        description: string,
        is_votable: boolean,
        total_amount: number,
        individual_amount: number,
        is_approved: boolean,
        is_deleted: boolean,
        hoa_id: string
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.is_votable = is_votable
        this.total_amount = total_amount
        this.individual_amount = individual_amount
        this.is_approved = is_approved
        this.is_deleted = is_deleted
        this.hoa_id = hoa_id
    }
    id: string;
    title: string;
    description: string;
    is_votable: boolean;
    total_amount: number;
    individual_amount: number;
    is_approved: boolean;
    is_deleted: boolean;
    hoa_id: string;
}