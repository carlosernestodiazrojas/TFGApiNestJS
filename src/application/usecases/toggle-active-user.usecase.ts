/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository, IUserRepositoryToken } from 'src/application/repository-interfaces/iuser.repository-interface';

@Injectable()
export class ToggleUserActiveUseCase {
    constructor(
        @Inject(IUserRepositoryToken)
        private userRepo: IUserRepository
    ) { }

    async execute(id: string) {
        return this.userRepo.toggleActive(id)
    }
}