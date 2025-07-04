export interface IUpdateSpecialAssessmentDto {
    title: string;
    description: string;
    is_votable: boolean;
    total_amount: number;
    individual_amount: number;
    is_approved: boolean;
    file_id: string;
}
