/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

export const jwtConstants = {
    secret: process.env.JWT_SECRET || 'secretKey',
    refresh_secret: process.env.REFRESH_JWT_SECRET || 'refreshSecretKey',
};
