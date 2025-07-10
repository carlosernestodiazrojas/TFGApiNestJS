/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from '../../../application/services/login/auth.service';
import { AuthController } from './auth.controller';

import { User } from '../../../adapters/entities/user.entity';
import { Role } from '../../../adapters/entities/role.entity';
import { UserRepository } from '../../../adapters/repositories/user.repository';
import { RoleRepository } from '../../../adapters/repositories/role.repository';

import { LoginDto } from 'src/adapters/dtos/users/login.dto';
import { LoginUseCase } from 'src/application/usecases/login/login.usecase';
import { RegisterUserUseCase } from 'src/application/usecases/register-user.usecase';

import { IUserRepositoryToken } from 'src/application/repository-interfaces/iuser.repository-interface';
import { IRoleRepositoryToken } from 'src/application/repository-interfaces/irole.repository-interface';

import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { jwtConstants } from 'src/common/strategies/constants';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Hoa } from 'src/adapters/entities/hoa.entity';
import { HoaRepository } from 'src/adapters/repositories/hoa.repository';
import { IHoaRepositoryToken } from 'src/application/repository-interfaces/ihoa.repository-interface';
import { RefreshTokenDto } from 'src/adapters/dtos/users/refreshToken.dto';
import { IFileRelationRepositoryToken } from 'src/application/repository-interfaces/ifile-relation.repository-interface';
import { FileRelationRepository } from 'src/adapters/repositories/file-relation.repository';
import { FileService } from 'src/application/services/upload/file.service';
import { S3Service } from 'src/application/services/upload/s3.service';
import { FileRelation } from 'src/adapters/entities/file_relations.entity';
import { FileEntity } from 'src/adapters/entities/file.entity';
import { CondominiumPropertyRepository } from 'src/adapters/repositories/condominium-property.repository';
import { IPropertyRepositoryToken } from 'src/application/repository-interfaces/iproperty.repository-interface';
import { Property } from 'src/adapters/entities/property.entity';
import { ICondominiumRepositoryToken } from 'src/application/repository-interfaces/icondominium.repository-interface';
import { CondominiumRepository } from 'src/adapters/repositories/condominium.repository';
import { Condominium } from 'src/adapters/entities/condominium.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role, Hoa, FileEntity, FileRelation, Property, Condominium]),
        PassportModule.register({ defaultStrategy: 'jwt' }),

        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '24h' },
        }),
    ],
    providers: [

        UserRepository,
        RoleRepository,
        HoaRepository,
        CondominiumPropertyRepository,
        AuthService,
        LoginDto,
        RefreshTokenDto,
        LoginUseCase,
        RegisterUserUseCase,
        { provide: IUserRepositoryToken, useClass: UserRepository },
        { provide: IRoleRepositoryToken, useClass: RoleRepository },
        { provide: IHoaRepositoryToken, useClass: HoaRepository },

        JwtStrategy,
        RolesGuard,
        {
            provide: IFileRelationRepositoryToken,
            useClass: FileRelationRepository,
        },
        {
            provide: IPropertyRepositoryToken,
            useClass: CondominiumPropertyRepository,
        },
        {
            provide: ICondominiumRepositoryToken,
            useClass: CondominiumRepository,
        },
        FileService,
        S3Service
    ],
    controllers: [AuthController],
    exports: [
        PassportModule,
        JwtModule,
        RolesGuard
    ],
})
export class AuthModule { }
