import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hoa } from "src/infrastructure/entities/hoa.entity";
import { JwtService } from "@nestjs/jwt";
import { IncidenceController } from "./incidence.controller";
import { IIncidenceRepositoryToken } from "src/domain/repository-interfaces/iincidence.repository-interface";
import { IncidenceRepository } from "src/infrastructure/repositories/incidence.repository";
import { IncidenceManagementUseCase } from "src/application/usecases/incidence/incidence-management.usecase";
import { CreateIncidenceDto } from "src/application/dtos/incidences/create-incidence.dto";
import { UpdateIncidenceDto } from "src/application/dtos/incidences/update-incidence.dto";
import { Incidence } from "src/infrastructure/entities/incidence.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Hoa, Incidence])],
    providers: [
        JwtService,
        IncidenceManagementUseCase,
        CreateIncidenceDto,
        UpdateIncidenceDto,
        {
            provide: IIncidenceRepositoryToken,
            useClass: IncidenceRepository,
        },
    ],
    controllers: [IncidenceController]
})
export class IncidenceModule {

}