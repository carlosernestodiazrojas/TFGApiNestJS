import { MigrationInterface, QueryRunner } from "typeorm";

export class SpecialAssessmentHoaRelation1747516037164 implements MigrationInterface {
    name = 'SpecialAssessmentHoaRelation1747516037164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "special_assessments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "is_votable" boolean NOT NULL, "total_amount" double precision NOT NULL, "individual_amount" double precision NOT NULL, "is_approved" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL, "deleted_at" TIMESTAMP, "hoa_id" uuid, CONSTRAINT "PK_47b6d11483a0037d915bc19f8c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "special_assessments" ADD CONSTRAINT "FK_88932bde211c6133ae29ed15b94" FOREIGN KEY ("hoa_id") REFERENCES "hoas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "special_assessments" DROP CONSTRAINT "FK_88932bde211c6133ae29ed15b94"`);
        await queryRunner.query(`DROP TABLE "special_assessments"`);
    }

}
