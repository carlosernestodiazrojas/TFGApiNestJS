/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Module } from "@nestjs/common";
import { CondominiumController } from "./condominium.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hoa } from "src/adapters/entities/hoa.entity";
import { JwtService } from "@nestjs/jwt";
import { CondominiumManagementUseCase } from "src/application/usecases/condominium/condominium-management.usecase";
import { RolesGuard } from "src/common/guards/roles.guard";
import { CreateCondominiumDto } from "src/adapters/dtos/condominiums/create-condominium.dto";
import { UpdateCondominiumDto } from "src/adapters/dtos/condominiums/update-condominium.dto";
import { ICondominiumRepositoryToken } from "src/application/repository-interfaces/icondominium.repository-interface";
import { CondominiumRepository } from "src/adapters/repositories/condominium.repository";
import { Condominium } from "src/adapters/entities/condominium.entity";
import { IFileRelationRepositoryToken } from "src/application/repository-interfaces/ifile-relation.repository-interface";
import { FileRelationRepository } from "src/adapters/repositories/file-relation.repository";
import { FileEntity } from "src/adapters/entities/file.entity";
import { FileRelation } from "src/adapters/entities/file_relations.entity";
import { FileService } from "src/application/services/upload/file.service";
import { S3Service } from "src/application/services/upload/s3.service";

@Module({
    imports: [TypeOrmModule.forFeature([Condominium, Hoa, FileEntity, FileRelation])],
    providers: [
        JwtService,
        RolesGuard,
        CreateCondominiumDto,
        UpdateCondominiumDto,
        {
            provide: ICondominiumRepositoryToken,
            useClass: CondominiumRepository,
        },
        {
            provide: IFileRelationRepositoryToken,
            useClass: FileRelationRepository,
        },
        CondominiumManagementUseCase,
        FileService,
        S3Service
    ],
    controllers: [CondominiumController]
})
export class CondominiumModule {

}