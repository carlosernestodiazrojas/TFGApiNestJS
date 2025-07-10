/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Injectable } from '@nestjs/common';
import { AuthService } from '../../services/login/auth.service';
import { ILoginDto } from 'src/application/dto-interfaces/users/login.dto-interface';

@Injectable()
export class LoginUseCase {
    constructor(private authService: AuthService) { }

    async execute(dto: ILoginDto) {
        return this.authService.login(dto.email, dto.password);
    }

    async refreshToken(userId: string) {
        return await this.authService.refreshToken(userId);
    }

}