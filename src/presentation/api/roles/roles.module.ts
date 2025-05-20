import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../../infrastructure/entities/role.entity';
import { RolesController } from './roles.controller';
import { JwtService } from '@nestjs/jwt';
import { GetRolesUseCase } from 'src/application/usecases/roles/get-roles.usecase';
import { IRoleRepositoryToken } from 'src/domain/repositories/irole.repository';
import { RoleRepository } from 'src/infrastructure/repositories/role.repository';

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