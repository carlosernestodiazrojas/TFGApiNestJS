/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Module } from "@nestjs/common";
import { PropertyController } from "./property.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Condominium } from "src/adapters/entities/condominium.entity";
import { Property } from "src/adapters/entities/property.entity";
import { RolesGuard } from "src/common/guards/roles.guard";
import { CreateCondominiumPropertyDto } from "src/adapters/dtos/condominium-properties/create-condominium-property.dto";
import { UpdateCondominiumPropertyDto } from "src/adapters/dtos/condominium-properties/update-condominium-property.dto";
import { CondominiumPropertyManagementUseCase } from "src/application/usecases/condominium-property/property-management.usecase";
import { IPropertyRepositoryToken } from "src/application/repository-interfaces/iproperty.repository-interface";
import { CondominiumPropertyRepository } from "src/adapters/repositories/condominium-property.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Condominium, Property])],
    providers: [
        JwtService,
        RolesGuard,
        CreateCondominiumPropertyDto,
        UpdateCondominiumPropertyDto,
        CondominiumPropertyManagementUseCase,
        {
            provide: IPropertyRepositoryToken,
            useClass: CondominiumPropertyRepository,
        },
    ],
    controllers: [PropertyController]
})
export class PropertyModule {

}