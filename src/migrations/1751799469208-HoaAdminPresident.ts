/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { MigrationInterface, QueryRunner } from "typeorm";

export class HoaAdminPresident1751799469208 implements MigrationInterface {
    name = 'HoaAdminPresident1751799469208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hoas" ADD "president_id" character varying`);
        await queryRunner.query(`ALTER TABLE "hoas" ADD "admin_id" character varying`);
        await queryRunner.query(`ALTER TABLE "announcements" ALTER COLUMN "to" SET DEFAULT NOW() + INTERVAL '10 days'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcements" ALTER COLUMN "to" SET DEFAULT (now() + '10 days')`);
        await queryRunner.query(`ALTER TABLE "hoas" DROP COLUMN "admin_id"`);
        await queryRunner.query(`ALTER TABLE "hoas" DROP COLUMN "president_id"`);
    }

}
