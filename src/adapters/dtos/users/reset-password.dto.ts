/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { IsNotEmpty, MinLength } from 'class-validator';
import { IresetPasswordDto } from 'src/application/dto-interfaces/users/reset-password.dto-interface';

export class ResetPasswordDto implements IresetPasswordDto {
    @IsNotEmpty()
    @MinLength(6)
    newPass: string;
}