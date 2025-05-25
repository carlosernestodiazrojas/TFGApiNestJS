import { MigrationInterface, QueryRunner } from "typeorm";

export class NUllableOnIncidencesSolvedAtField11748188344756 implements MigrationInterface {
    name = 'NUllableOnIncidencesSolvedAtField11748188344756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "incidences" ADD "solved_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "incidences" DROP COLUMN "solved_at"`);
    }

}
