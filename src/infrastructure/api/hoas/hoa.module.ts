/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Module } from "@nestjs/common";
import { HoaController } from "./hoa.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hoa } from "src/adapters/entities/hoa.entity";
import { JwtService } from "@nestjs/jwt";
import { IHoaRepositoryToken } from "src/application/repository-interfaces/ihoa.repository-interface";
import { HoaRepository } from "src/adapters/repositories/hoa.repository";
import { HoaManagementUseCase } from "src/application/usecases/hoa/hoa-management.usecase";
import { RolesGuard } from "src/common/guards/roles.guard";
import { CreateHoaDto } from "src/adapters/dtos/hoas/create-hoa.dto";
import { UpdateHoaDto } from "src/adapters/dtos/hoas/update-hoa.dto";
import { FileService } from "src/application/services/upload/file.service";

import { IFileEntityRepositoryToken } from "src/application/repository-interfaces/ifile-entity.repository-interface";
import { FileEntityRepository } from "src/adapters/repositories/file-entity.repository";
import { FileEntity } from "src/adapters/entities/file.entity";
import { S3Service } from "src/application/services/upload/s3.service";
import { IFileRelationRepositoryToken } from "src/application/repository-interfaces/ifile-relation.repository-interface";
import { FileRelationRepository } from "src/adapters/repositories/file-relation.repository";
import { FileRelation } from "src/adapters/entities/file_relations.entity";
import { GetUserUseCase } from "src/application/usecases/get-user.usecase";
import { UserRepository } from "src/adapters/repositories/user.repository";
import { IUserRepositoryToken } from "src/application/repository-interfaces/iuser.repository-interface";
import { User } from "src/adapters/entities/user.entity";
import { RoleRepository } from "src/adapters/repositories/role.repository";
import { IRoleRepositoryToken } from "src/application/repository-interfaces/irole.repository-interface";
import { Role } from "src/adapters/entities/role.entity";
import { CondominiumPropertyRepository } from "src/adapters/repositories/condominium-property.repository";
import { IPropertyRepositoryToken } from "src/application/repository-interfaces/iproperty.repository-interface";
import { Property } from "src/adapters/entities/property.entity";
import { CondominiumRepository } from "src/adapters/repositories/condominium.repository";
import { ICondominiumRepositoryToken } from "src/application/repository-interfaces/icondominium.repository-interface";
import { Condominium } from "src/adapters/entities/condominium.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Hoa, FileEntity, FileRelation, User, Role, Property, Condominium])],
    providers: [
        JwtService,
        RolesGuard,
        UserRepository,
        RoleRepository,
        GetUserUseCase,
        HoaRepository,
        CondominiumPropertyRepository,
        CondominiumRepository,
        HoaManagementUseCase,
        {
            provide: IHoaRepositoryToken,
            useClass: HoaRepository,
        },
        {
            provide: IFileEntityRepositoryToken,
            useClass: FileEntityRepository,
        },
        {
            provide: IFileRelationRepositoryToken,
            useClass: FileRelationRepository,
        },
        {
            provide: IUserRepositoryToken,
            useClass: UserRepository,
        },
        {
            provide: IRoleRepositoryToken,
            useClass: RoleRepository,
        },
        {
            provide: IPropertyRepositoryToken,
            useClass: CondominiumPropertyRepository,
        },
        {
            provide: ICondominiumRepositoryToken,
            useClass: CondominiumRepository,
        },
        CreateHoaDto,
        UpdateHoaDto,
        FileService,
        S3Service
    ],
    controllers: [HoaController]
})
export class HoaModule {

}