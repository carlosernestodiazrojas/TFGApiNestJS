/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { MigrationInterface, QueryRunner } from "typeorm";

export class AnnouncementHoaRelation1747515441950 implements MigrationInterface {
    name = 'AnnouncementHoaRelation1747515441950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "announcements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL, "deleted_at" TIMESTAMP, "hoa_id" uuid, CONSTRAINT "PK_b3ad760876ff2e19d58e05dc8b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD CONSTRAINT "FK_ee5ffd4a44ef764c2cc6d6a22ba" FOREIGN KEY ("hoa_id") REFERENCES "hoas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcements" DROP CONSTRAINT "FK_ee5ffd4a44ef764c2cc6d6a22ba"`);
        await queryRunner.query(`DROP TABLE "announcements"`);
    }

}
