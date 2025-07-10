/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { MigrationInterface, QueryRunner } from "typeorm";

export class CondominiumCommonAreaRelation1747517662402 implements MigrationInterface {
    name = 'CondominiumCommonAreaRelation1747517662402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "common_areas" DROP CONSTRAINT "FK_c65d5612e7506e91fa4761a98d3"`);
        await queryRunner.query(`ALTER TABLE "common_areas" RENAME COLUMN "hoa_id" TO "condominium_id"`);
        await queryRunner.query(`ALTER TABLE "common_areas" ADD CONSTRAINT "FK_168c34520f0760984f1951a249b" FOREIGN KEY ("condominium_id") REFERENCES "condominiums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "common_areas" DROP CONSTRAINT "FK_168c34520f0760984f1951a249b"`);
        await queryRunner.query(`ALTER TABLE "common_areas" RENAME COLUMN "condominium_id" TO "hoa_id"`);
        await queryRunner.query(`ALTER TABLE "common_areas" ADD CONSTRAINT "FK_c65d5612e7506e91fa4761a98d3" FOREIGN KEY ("hoa_id") REFERENCES "hoas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
