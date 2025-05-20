import { MigrationInterface, QueryRunner } from "typeorm";

export class CondominiumPropertyImproveRelation1747518111762 implements MigrationInterface {
    name = 'CondominiumPropertyImproveRelation1747518111762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "is_bookable"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "daily_capacity"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "property_identifier" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "property_identifier"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "daily_capacity" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "is_bookable" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "description" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "name" character varying NOT NULL`);
    }

}
