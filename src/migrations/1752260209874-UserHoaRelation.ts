import { MigrationInterface, QueryRunner } from "typeorm";

export class UserHoaRelation1752260209874 implements MigrationInterface {
    name = 'UserHoaRelation1752260209874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "announcements" ALTER COLUMN "to" SET DEFAULT NOW() + INTERVAL '10 days'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcements" ALTER COLUMN "to" SET DEFAULT (now() + '10 days')`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "active"`);
    }

}
