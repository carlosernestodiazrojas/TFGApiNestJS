/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from '../../../adapters/dtos/users/login.dto';
import { LoginUseCase } from '../../../application/usecases/login/login.usecase';
import { RegisterUserUseCase } from '../../../application/usecases/register-user.usecase';
import { CreateUserDto } from '../../../adapters/dtos/users/create-user.dto';
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RefreshTokenDto } from 'src/adapters/dtos/users/refreshToken.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private registerUseCase: RegisterUserUseCase,
        private loginUseCase: LoginUseCase,
    ) { }

    @Post('register')
    register(@Body() dto: CreateUserDto) {
        return this.registerUseCase.execute(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.loginUseCase.execute(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    logout(@Request() req) {
        return { message: 'Logout exitoso' };
    }

    @UseGuards(JwtAuthGuard)
    @Post('refresh_token')
    refresh_token(@Body() dto: RefreshTokenDto) {
        return this.loginUseCase.refreshToken(dto.userId);
    }

}