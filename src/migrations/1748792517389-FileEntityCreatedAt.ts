import { MigrationInterface, QueryRunner } from "typeorm";

export class FileEntityCreatedAt1748792517389 implements MigrationInterface {
    name = 'FileEntityCreatedAt1748792517389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "created_at"`);
    }

}
