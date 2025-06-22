import { MigrationInterface, QueryRunner } from "typeorm";

export class AnnouncementDates1749397578302 implements MigrationInterface {
    name = 'AnnouncementDates1749397578302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcements" ALTER COLUMN "to" SET DEFAULT NOW() + INTERVAL '10 days'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcements" ALTER COLUMN "to" SET DEFAULT (now() + '10 days')`);
    }

}
