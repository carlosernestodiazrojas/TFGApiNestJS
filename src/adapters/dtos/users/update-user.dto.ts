/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { IsEmail, IsEnum, IsOptional, IsUUID, MinLength } from 'class-validator';
import { RoleName } from 'src/common/enums/role-name.enum';
import { IUpdateUserDto } from 'src/application/dto-interfaces/users/update-user.dto-interface';

export class UpdateUserDto implements IUpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @MinLength(6)
    password?: string;

    @IsOptional()
    name?: string;

    @IsOptional()
    last_name?: string;

    @IsOptional()
    active?: boolean;

    @IsOptional()
    @IsEnum(RoleName)
    role?: RoleName;

    @IsOptional()
    @IsUUID('4')
    file_id: string;

    @IsOptional()
    @IsUUID('4')
    property: string;

}