import { MigrationInterface, QueryRunner } from "typeorm";

export class SpecialAssessmentDecimals1747516200992 implements MigrationInterface {
    name = 'SpecialAssessmentDecimals1747516200992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "special_assessments" DROP COLUMN "total_amount"`);
        await queryRunner.query(`ALTER TABLE "special_assessments" ADD "total_amount" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "special_assessments" DROP COLUMN "individual_amount"`);
        await queryRunner.query(`ALTER TABLE "special_assessments" ADD "individual_amount" numeric(10,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "special_assessments" DROP COLUMN "individual_amount"`);
        await queryRunner.query(`ALTER TABLE "special_assessments" ADD "individual_amount" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "special_assessments" DROP COLUMN "total_amount"`);
        await queryRunner.query(`ALTER TABLE "special_assessments" ADD "total_amount" double precision NOT NULL`);
    }

}
