/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserRepository, IUserRepositoryToken } from 'src/application/repository-interfaces/iuser.repository-interface';

@Injectable()
export class ChangePasswordUseCase {
    constructor(
        @Inject(IUserRepositoryToken)
        private userRepo: IUserRepository
    ) { }

    async execute(id: string, oldPass: string, newPass: string) {
        const user = await this.userRepo.findById(id);
        if (!user) throw new BadRequestException('No se encuentra el usuario');
        const match = await bcrypt.compare(oldPass, user?.password);
        if (!match) throw new BadRequestException('Contraseña actual incorrecta');
        const hash = await bcrypt.hash(newPass, 10);
        await this.userRepo.update(id, { password: hash });
        return { message: 'Contraseña actualizada' };
    }

    async forceChangePassword(id: string, newPass: string) {
        const user = await this.userRepo.findById(id);
        if (!user) throw new BadRequestException('No se encuentra el usuario');
        const hash = await bcrypt.hash(newPass, 10);
        await this.userRepo.update(id, { password: hash });
        return { message: 'Contraseña actualizada' };
    }

}