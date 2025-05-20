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
import { IRoleRepositoryToken } from 'src/domain/repositories/irole.repository';
import { IUserRepositoryToken } from 'src/domain/repositories/iuser.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role])],
    controllers: [UsersController],
    providers: [UserRepository, RoleRepository, RegisterUserUseCase, UpdateUserUseCase, ChangePasswordUseCase, {
        provide: IRoleRepositoryToken,
        useClass: RoleRepository,
    }, {
            provide: IUserRepositoryToken,
            useClass: UserRepository,
        }, JwtService],
})
export class UsersModule { }