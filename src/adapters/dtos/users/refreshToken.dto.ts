/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { IsNotEmpty } from 'class-validator';
import { IRefreshTokenDto } from 'src/application/dto-interfaces/users/refresh-token.dto-interface';

export class RefreshTokenDto implements IRefreshTokenDto {
    @IsNotEmpty()
    userId: string;
}