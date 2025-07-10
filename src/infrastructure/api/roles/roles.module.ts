/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../../adapters/entities/role.entity';
import { RolesController } from './roles.controller';
import { JwtService } from '@nestjs/jwt';
import { GetRolesUseCase } from 'src/application/usecases/roles/get-roles.usecase';
import { IRoleRepositoryToken } from 'src/application/repository-interfaces/irole.repository-interface';
import { RoleRepository } from 'src/adapters/repositories/role.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    providers: [
        JwtService,
        GetRolesUseCase,
        {
            provide: IRoleRepositoryToken,
            useClass: RoleRepository,
        }
    ],
    controllers: [RolesController],
})
export class RolesModule { }