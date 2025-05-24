import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from '../../../application/services/login/auth.service';
import { AuthController } from './auth.controller';

import { User } from '../../../infrastructure/entities/user.entity';
import { Role } from '../../../infrastructure/entities/role.entity';
import { UserRepository } from '../../../infrastructure/repositories/user.repository';
import { RoleRepository } from '../../../infrastructure/repositories/role.repository';

import { LoginDto } from 'src/application/dtos/users/login.dto';
import { LoginUseCase } from 'src/application/usecases/login/login.usecase';
import { RegisterUserUseCase } from 'src/application/usecases/register-user.usecase';

import { IUserRepositoryToken } from 'src/domain/repository-interfaces/iuser.repository-interface';
import { IRoleRepositoryToken } from 'src/domain/repository-interfaces/irole.repository-interface';

import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { jwtConstants } from 'src/common/strategies/constants';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role]),
        PassportModule.register({ defaultStrategy: 'jwt' }),

        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [

        UserRepository,
        RoleRepository,
        AuthService,
        LoginDto,
        LoginUseCase,
        RegisterUserUseCase,
        { provide: IUserRepositoryToken, useClass: UserRepository },
        { provide: IRoleRepositoryToken, useClass: RoleRepository },

        JwtStrategy,
        RolesGuard
    ],
    controllers: [AuthController],
    exports: [
        PassportModule,
        JwtModule,
        RolesGuard
    ],
})
export class AuthModule { }
