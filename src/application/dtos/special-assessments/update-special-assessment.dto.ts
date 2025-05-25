import { IsBoolean, IsDecimal, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UpdateSpecialAssessmentDtoInterface } from 'src/domain/dto-interfaces/special-assessments/update-assessment.dto-interface';

export class UpdateSpecialAssessmentDto implements UpdateSpecialAssessmentDtoInterface {

    @IsOptional()
    @IsBoolean()
    is_approved: boolean;

    @IsOptional()
    @IsBoolean()
    is_votable: boolean;

    @IsOptional()
    @IsDecimal({ decimal_digits: '2' })
    total_amount: number;

    @IsOptional()
    @IsDecimal({ decimal_digits: '2' })
    individual_amount: number;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    title: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    description: string;

}
