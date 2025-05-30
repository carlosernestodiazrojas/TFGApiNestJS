import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from '../../../infrastructure/entities/user.entity';
import { Role } from '../../../infrastructure/entities/role.entity';
import { UserRepository } from '../../../infrastructure/repositories/user.repository';
import { RoleRepository } from '../../../infrastructure/repositories/role.repository';
import { RegisterUserUseCase } from '../../../application/usecases/register-user.usecase';
import { UpdateUserUseCase } from '../../../application/usecases/update-user.usecase';
import { ChangePasswordUseCase } from '../../../application/usecases/change-password.usecase';
import { IRoleRepositoryToken } from 'src/domain/repository-interfaces/irole.repository-interface';
import { IUserRepositoryToken } from 'src/domain/repository-interfaces/iuser.repository-interface';
import { JwtService } from '@nestjs/jwt';
import { IHoaMeetingRepositoryToken } from 'src/domain/repository-interfaces/ihoa-meeting.repository-interface';
import { HoaRepository } from 'src/infrastructure/repositories/hoa.repository';
import { Hoa } from 'src/infrastructure/entities/hoa.entity';
import { IHoaRepositoryToken } from 'src/domain/repository-interfaces/ihoa.repository-interface';

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