import { HoaModel } from "./hoa.model";

export interface SpecialAssessmentModel {
    id: string;
    title: string;
    description: string;
    is_votable: boolean;
    total_amount: number;
    individual_amount: number;
    is_approved: boolean;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    deleted_at: string;
    hoa: HoaModel;
}