/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { MigrationInterface, QueryRunner } from "typeorm";

export class NUllableOnIncidencesSolvedAtField1748188141653 implements MigrationInterface {
    name = 'NUllableOnIncidencesSolvedAtField1748188141653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "incidences" DROP COLUMN "solved_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "incidences" ADD "solved_at" TIMESTAMP`);
    }

}
