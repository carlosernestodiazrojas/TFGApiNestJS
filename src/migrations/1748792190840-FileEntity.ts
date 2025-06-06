import { MigrationInterface, QueryRunner } from "typeorm";

export class FileEntity1748792190840 implements MigrationInterface {
    name = 'FileEntity1748792190840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sha256" character varying NOT NULL, "mimetype" character varying NOT NULL, "extension" character varying NOT NULL, "size" integer NOT NULL, "originalName" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "files"`);
    }

}
