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

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role, Hoa]),
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
        AuthService,
        LoginDto,
        RefreshTokenDto,
        LoginUseCase,
        RegisterUserUseCase,
        { provide: IUserRepositoryToken, useClass: UserRepository },
        { provide: IRoleRepositoryToken, useClass: RoleRepository },
        { provide: IHoaRepositoryToken, useClass: HoaRepository },

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
