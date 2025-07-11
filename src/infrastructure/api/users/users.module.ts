/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from '../../../adapters/entities/user.entity';
import { Role } from '../../../adapters/entities/role.entity';
import { UserRepository } from '../../../adapters/repositories/user.repository';
import { RoleRepository } from '../../../adapters/repositories/role.repository';
import { RegisterUserUseCase } from '../../../application/usecases/register-user.usecase';
import { UpdateUserUseCase } from '../../../application/usecases/update-user.usecase';
import { ChangePasswordUseCase } from '../../../application/usecases/change-password.usecase';
import { IRoleRepositoryToken } from 'src/application/repository-interfaces/irole.repository-interface';
import { IUserRepositoryToken } from 'src/application/repository-interfaces/iuser.repository-interface';
import { JwtService } from '@nestjs/jwt';
import { HoaRepository } from 'src/adapters/repositories/hoa.repository';
import { Hoa } from 'src/adapters/entities/hoa.entity';
import { IHoaRepositoryToken } from 'src/application/repository-interfaces/ihoa.repository-interface';
import { GetUserUseCase } from 'src/application/usecases/get-user.usecase';
import { FileService } from 'src/application/services/upload/file.service';
import { S3Service } from 'src/application/services/upload/s3.service';
import { IFileRelationRepositoryToken } from 'src/application/repository-interfaces/ifile-relation.repository-interface';
import { FileRelationRepository } from 'src/adapters/repositories/file-relation.repository';
import { FileRelation } from 'src/adapters/entities/file_relations.entity';
import { FileEntity } from 'src/adapters/entities/file.entity';
import { GetAllUsersUseCase } from 'src/application/usecases/get-all-users.usecase';
import { CondominiumPropertyRepository } from 'src/adapters/repositories/condominium-property.repository';
import { ICondominiumRepositoryToken } from 'src/application/repository-interfaces/icondominium.repository-interface';
import { Property } from 'src/adapters/entities/property.entity';
import { CondominiumRepository } from 'src/adapters/repositories/condominium.repository';
import { Condominium } from 'src/adapters/entities/condominium.entity';
import { IPropertyRepositoryToken } from 'src/application/repository-interfaces/iproperty.repository-interface';
import { ToggleUserActiveUseCase } from 'src/application/usecases/toggle-active-user.usecase';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role, Hoa, FileEntity, FileRelation, Condominium, Property])],
    controllers: [UsersController],
    providers: [
        UserRepository,
        RoleRepository,
        HoaRepository,
        CondominiumPropertyRepository,
        CondominiumRepository,
        RegisterUserUseCase,
        UpdateUserUseCase,
        GetUserUseCase,
        GetAllUsersUseCase,
        ChangePasswordUseCase,
        ToggleUserActiveUseCase,
        {
            provide: IRoleRepositoryToken,
            useClass: RoleRepository,
        },
        {
            provide: IUserRepositoryToken,
            useClass: UserRepository,
        },
        {
            provide: IHoaRepositoryToken,
            useClass: HoaRepository,
        },
        {
            provide: IPropertyRepositoryToken,
            useClass: CondominiumPropertyRepository,
        },
        {
            provide: ICondominiumRepositoryToken,
            useClass: CondominiumRepository,
        },
        JwtService,
        {
            provide: IFileRelationRepositoryToken,
            useClass: FileRelationRepository,
        },
        FileService,
        S3Service
    ],
})
export class UsersModule { }