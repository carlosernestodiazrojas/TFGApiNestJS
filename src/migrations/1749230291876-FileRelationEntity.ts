/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { MigrationInterface, QueryRunner } from "typeorm";

export class FileRelationEntity1749230291876 implements MigrationInterface {
    name = 'FileRelationEntity1749230291876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file_relations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "relation_entity_type" character varying NOT NULL, "relation_entity_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL, "deleted_at" TIMESTAMP, "file_id" uuid, CONSTRAINT "PK_15e98b89ffbe7435ced54e9800c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "file_relations" ADD CONSTRAINT "FK_23d663ce56cbb893f92781a9cf3" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file_relations" DROP CONSTRAINT "FK_23d663ce56cbb893f92781a9cf3"`);
        await queryRunner.query(`DROP TABLE "file_relations"`);
    }

}
