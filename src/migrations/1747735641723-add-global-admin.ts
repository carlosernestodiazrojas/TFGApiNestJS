import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGlobalAdmin1747735641723 implements MigrationInterface {
    name = 'AddGlobalAdmin1747735641723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ADD "code" integer`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "UQ_f6d54f95c31b73fb1bdd8e91d0c" UNIQUE ("code")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "UQ_f6d54f95c31b73fb1bdd8e91d0c"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "code"`);
    }

}
