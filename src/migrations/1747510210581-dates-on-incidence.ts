/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { MigrationInterface, QueryRunner } from "typeorm";

export class DatesOnIncidence1747510210581 implements MigrationInterface {
    name = 'DatesOnIncidence1747510210581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "incidences" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "incidences" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "incidences" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "incidences" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "incidences" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "incidences" DROP COLUMN "created_at"`);
    }

}
