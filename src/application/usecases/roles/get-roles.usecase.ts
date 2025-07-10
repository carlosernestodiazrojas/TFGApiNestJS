/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Inject, Injectable } from "@nestjs/common";
import { IRoleRepository, IRoleRepositoryToken } from "src/application/repository-interfaces/irole.repository-interface";

@Injectable()
export class GetRolesUseCase {
    constructor(
        @Inject(IRoleRepositoryToken)
        private roleRepo: IRoleRepository
    ) { }

    async execute() {
        return this.roleRepo.findAll();
    }
}