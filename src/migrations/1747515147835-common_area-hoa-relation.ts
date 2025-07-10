/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { MigrationInterface, QueryRunner } from "typeorm";

export class CommonAreaHoaRelation1747515147835 implements MigrationInterface {
    name = 'CommonAreaHoaRelation1747515147835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "common_areas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "is_bookable" boolean NOT NULL, "daily_capacity" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL, "deleted_at" TIMESTAMP, "hoa_id" uuid, CONSTRAINT "PK_849f6053aa934ce441c1cfc763e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "common_areas" ADD CONSTRAINT "FK_c65d5612e7506e91fa4761a98d3" FOREIGN KEY ("hoa_id") REFERENCES "hoas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "common_areas" DROP CONSTRAINT "FK_c65d5612e7506e91fa4761a98d3"`);
        await queryRunner.query(`DROP TABLE "common_areas"`);
    }

}
