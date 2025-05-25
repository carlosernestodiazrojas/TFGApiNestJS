
import { IsBoolean, IsDecimal, IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { CreateSpecialAssessmentDtoInterface } from 'src/domain/dto-interfaces/special-assessments/create-assessment.dto-interface';

export class CreateSpecialAssessmentDto implements CreateSpecialAssessmentDtoInterface {

    @IsNotEmpty()
    @IsBoolean()
    is_votable: boolean;

    @IsNotEmpty()
    @IsDecimal({ decimal_digits: '2' })
    total_amount: number;

    @IsNotEmpty()
    @IsDecimal({ decimal_digits: '2' })
    individual_amount: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    title: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    description: string;

    @IsNotEmpty()
    @IsUUID('4')
    hoa_id: string;
}