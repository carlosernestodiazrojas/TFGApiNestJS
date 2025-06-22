import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hoa } from "src/adapters/entities/hoa.entity";
import { JwtService } from "@nestjs/jwt";
import { SpecialAssessmentController } from "./special-assessment.controller";
import { SpecialAssessment } from "src/adapters/entities/special-assessment.entity";
import { CreateSpecialAssessmentDto } from "src/adapters/dtos/special-assessments/create-special-assessment.dto";
import { UpdateSpecialAssessmentDto } from "src/adapters/dtos/special-assessments/update-special-assessment.dto";
import { RolesGuard } from "src/common/guards/roles.guard";
import { ISpecialAssessmentRepositoryToken } from "src/application/repository-interfaces/ispecial-assessment.repository-interface";
import { SpecialAssessmentRepository } from "src/adapters/repositories/special-assessment.repository";
import { SpecialAssessmentManagementUseCase } from "src/application/usecases/special-assessment/special-assessment-management.usecase";

@Module({
    imports: [TypeOrmModule.forFeature([Hoa, SpecialAssessment])],
    providers: [
        JwtService,
        CreateSpecialAssessmentDto,
        UpdateSpecialAssessmentDto,
        RolesGuard,
        SpecialAssessmentManagementUseCase,
        {
            provide: ISpecialAssessmentRepositoryToken,
            useClass: SpecialAssessmentRepository,
        },
    ],
    controllers: [SpecialAssessmentController]
})
export class SpecialAssessmentModule {

}