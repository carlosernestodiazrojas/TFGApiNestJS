/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { IsNotEmpty, MinLength } from 'class-validator';
import { IChangePasswordDto } from 'src/application/dto-interfaces/users/change-password.dto-interface';

export class ChangePasswordDto implements IChangePasswordDto {

    @IsNotEmpty()
    @MinLength(6)
    oldPass: string;

    @IsNotEmpty()
    @MinLength(6)
    newPass: string;
}