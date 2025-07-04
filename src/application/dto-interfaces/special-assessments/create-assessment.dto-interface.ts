
export interface ICreateSpecialAssessmentDto {
    title: string;
    description: string;
    is_votable: boolean;
    total_amount: number;
    individual_amount: number;
    hoa_id: string;
    file_id: string;
}