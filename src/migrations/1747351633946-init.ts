import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1747351633946 implements MigrationInterface {
    name = 'Init1747351633946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hoas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_aaa998ecfaffb28016ff04aa518" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "hoas"`);
    }

}
