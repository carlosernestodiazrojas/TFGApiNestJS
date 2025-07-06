import { MigrationInterface, QueryRunner } from "typeorm";

export class UserProperty1751800133995 implements MigrationInterface {
    name = 'UserProperty1751800133995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "property_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_d701e9396a36e6e9e5b7bbf72a8" UNIQUE ("property_id")`);
        await queryRunner.query(`ALTER TABLE "announcements" ALTER COLUMN "to" SET DEFAULT NOW() + INTERVAL '10 days'`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d701e9396a36e6e9e5b7bbf72a8" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d701e9396a36e6e9e5b7bbf72a8"`);
        await queryRunner.query(`ALTER TABLE "announcements" ALTER COLUMN "to" SET DEFAULT (now() + '10 days')`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_d701e9396a36e6e9e5b7bbf72a8"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "property_id"`);
    }

}
