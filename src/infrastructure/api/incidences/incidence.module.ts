/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

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
import { IFileRelationRepositoryToken } from "src/application/repository-interfaces/ifile-relation.repository-interface";
import { FileRelationRepository } from "src/adapters/repositories/file-relation.repository";
import { FileService } from "src/application/services/upload/file.service";
import { S3Service } from "src/application/services/upload/s3.service";
import { FileEntity } from "src/adapters/entities/file.entity";
import { FileRelation } from "src/adapters/entities/file_relations.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Hoa, Incidence, FileEntity, FileRelation])],
    providers: [
        JwtService,
        IncidenceManagementUseCase,
        CreateIncidenceDto,
        UpdateIncidenceDto,
        {
            provide: IIncidenceRepositoryToken,
            useClass: IncidenceRepository,
        },

        {
            provide: IFileRelationRepositoryToken,
            useClass: FileRelationRepository,
        },
        FileService,
        S3Service
    ],
    controllers: [IncidenceController]
})
export class IncidenceModule {

}