/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { MigrationInterface, QueryRunner } from "typeorm";

export class MeetingSubjectRelation1747518814133 implements MigrationInterface {
    name = 'MeetingSubjectRelation1747518814133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meeting_subjects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL, "deleted_at" TIMESTAMP, "meeting_id" uuid, CONSTRAINT "PK_de13cef0803ef00bfb04f1b1be0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "meeting_subjects" ADD CONSTRAINT "FK_19f6278f295442f80d28168955f" FOREIGN KEY ("meeting_id") REFERENCES "hoa_meetings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting_subjects" DROP CONSTRAINT "FK_19f6278f295442f80d28168955f"`);
        await queryRunner.query(`DROP TABLE "meeting_subjects"`);
    }

}
