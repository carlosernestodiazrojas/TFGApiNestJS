import { MigrationInterface, QueryRunner } from "typeorm";

export class IncidenceHoaRelation1747513690811 implements MigrationInterface {
    name = 'IncidenceHoaRelation1747513690811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "incidences" ADD "is_votable" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "incidences" ADD "is_solved" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "incidences" ADD "solved_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "incidences" ADD "hoa_id" uuid`);
        await queryRunner.query(`ALTER TABLE "incidences" ADD CONSTRAINT "FK_cd04ea2205b7bff599a59284096" FOREIGN KEY ("hoa_id") REFERENCES "hoas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "incidences" DROP CONSTRAINT "FK_cd04ea2205b7bff599a59284096"`);
        await queryRunner.query(`ALTER TABLE "incidences" DROP COLUMN "hoa_id"`);
        await queryRunner.query(`ALTER TABLE "incidences" DROP COLUMN "solved_at"`);
        await queryRunner.query(`ALTER TABLE "incidences" DROP COLUMN "is_solved"`);
        await queryRunner.query(`ALTER TABLE "incidences" DROP COLUMN "is_votable"`);
    }

}
