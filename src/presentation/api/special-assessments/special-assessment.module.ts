import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hoa } from "src/infrastructure/entities/hoa.entity";
import { JwtService } from "@nestjs/jwt";
import { SpecialAssessmentController } from "./special-assessment.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Hoa])],
    providers: [JwtService],
    controllers: [SpecialAssessmentController]
})
export class SpecialAssessmentModule {

}