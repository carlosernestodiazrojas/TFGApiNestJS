/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { MigrationInterface, QueryRunner } from "typeorm";

export class UserHoaRelation1748622363313 implements MigrationInterface {
    name = 'UserHoaRelation1748622363313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "hoa_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8626488113ddc4dc39034f3bbed" FOREIGN KEY ("hoa_id") REFERENCES "hoas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8626488113ddc4dc39034f3bbed"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hoa_id"`);
    }

}
