/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { MigrationInterface, QueryRunner } from "typeorm";

export class PropertyExtraFields1749312940516 implements MigrationInterface {
    name = 'PropertyExtraFields1749312940516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" ADD "property_type" character varying NOT NULL DEFAULT 'interior'`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "has_storage_room" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "has_parking_space" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "currentOnPayments" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "currentOnPayments"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "has_parking_space"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "has_storage_room"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "property_type"`);
    }

}
