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
import { IHoaMeetingRepositoryToken } from 'src/application/repository-interfaces/ihoa-meeting.repository-interface';
import { HoaRepository } from 'src/adapters/repositories/hoa.repository';
import { Hoa } from 'src/adapters/entities/hoa.entity';
import { IHoaRepositoryToken } from 'src/application/repository-interfaces/ihoa.repository-interface';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role, Hoa])],
    controllers: [UsersController],
    providers: [
        UserRepository,
        RoleRepository,
        HoaRepository,
        RegisterUserUseCase,
        UpdateUserUseCase,
        ChangePasswordUseCase,
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
        JwtService
    ],
})
export class UsersModule { }