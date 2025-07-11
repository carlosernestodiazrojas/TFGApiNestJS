/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUserRepository, IUserRepositoryToken } from '../../../application/repository-interfaces/iuser.repository-interface';
import { UserVM } from 'src/adapters/vm/user.vm';

@Injectable()
export class AuthService {
    constructor(
        @Inject(IUserRepositoryToken)
        private userRepo: IUserRepository,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) throw new UnauthorizedException('Credenciales inválidas');
        if (!user.active) throw new UnauthorizedException('Usuario no habilitado');
        const match = await bcrypt.compare(pass, user.password);
        if (!match) throw new UnauthorizedException('Credenciales inválidas');
        return user;
    }

    async login(email: string, pass: string) {
        const user = await this.validateUser(email, pass);
        const payload = { sub: user.id, email: user.email, role: user.role.name };
        return {
            access_token: this.jwtService.sign(payload),
            email: user.email,
            role: user.role.name,
            user_id: user.id,
            hoa_id: user.hoa ? user.hoa.id : null,
            name: user.name,
            last_name: user.last_name
        };
    }


    async refreshToken(userId: string) {
        const user = await this.userRepo.findById(userId);
        if (!user) throw new UnauthorizedException('Credenciales inválidas');
        return this.loginAndRefresh(user);
    }

    async loginAndRefresh(user: UserVM) {
        const payload = { sub: user.id, email: user.email, role: user.role.name };
        return {
            access_token: this.jwtService.sign(payload),
            email: user.email,
            role: user.role.name,
            user_id: user.id,
            hoa_id: user.hoa ? user.hoa.id : null,
            name: user.name,
            last_name: user.last_name
        };
    }


}