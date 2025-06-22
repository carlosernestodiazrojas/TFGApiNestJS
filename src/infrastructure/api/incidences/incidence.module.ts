import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hoa } from "src/adapters/entities/hoa.entity";
import { JwtService } from "@nestjs/jwt";
import { IncidenceController } from "./incidence.controller";
import { IIncidenceRepositoryToken } from "src/application/repository-interfaces/iincidence.repository-interface";
import { IncidenceRepository } from "src/adapters/repositories/incidence.repository";
import { IncidenceManagementUseCase } from "src/application/usecases/incidence/incidence-management.usecase";
import { CreateIncidenceDto } from "src/adapters/dtos/incidences/create-incidence.dto";
import { UpdateIncidenceDto } from "src/adapters/dtos/incidences/update-incidence.dto";
import { Incidence } from "src/adapters/entities/incidence.entity";

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