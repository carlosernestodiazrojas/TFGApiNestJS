/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { IsEmail, IsNotEmpty } from 'class-validator';
import { ILoginDto } from 'src/application/dto-interfaces/users/login.dto-interface';

export class LoginDto implements ILoginDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}