import { MigrationInterface, QueryRunner } from "typeorm";

export class MeetingsRelations1747574220629 implements MigrationInterface {
    name = 'MeetingsRelations1747574220629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subject_incidences" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL, "deleted_at" TIMESTAMP, "incidence_id" uuid, "meeting_subject_id" uuid, CONSTRAINT "PK_0d0370595416705f13961b0c64a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject_assessments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL, "deleted_at" TIMESTAMP, "special_assessment_id" uuid, "meeting_subject_id" uuid, CONSTRAINT "PK_f5537e33e17398fab08a4432072" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "subject_incidences" ADD CONSTRAINT "FK_8d29b829a82c4c1cd44dc7a1e6d" FOREIGN KEY ("incidence_id") REFERENCES "incidences"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject_incidences" ADD CONSTRAINT "FK_64f4e58b80403e45a264786153d" FOREIGN KEY ("meeting_subject_id") REFERENCES "meeting_subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject_assessments" ADD CONSTRAINT "FK_014edb360fc6b550549d22e7f97" FOREIGN KEY ("special_assessment_id") REFERENCES "special_assessments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject_assessments" ADD CONSTRAINT "FK_62adca70f8b24733cd0b8a3d48e" FOREIGN KEY ("meeting_subject_id") REFERENCES "meeting_subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_assessments" DROP CONSTRAINT "FK_62adca70f8b24733cd0b8a3d48e"`);
        await queryRunner.query(`ALTER TABLE "subject_assessments" DROP CONSTRAINT "FK_014edb360fc6b550549d22e7f97"`);
        await queryRunner.query(`ALTER TABLE "subject_incidences" DROP CONSTRAINT "FK_64f4e58b80403e45a264786153d"`);
        await queryRunner.query(`ALTER TABLE "subject_incidences" DROP CONSTRAINT "FK_8d29b829a82c4c1cd44dc7a1e6d"`);
        await queryRunner.query(`DROP TABLE "subject_assessments"`);
        await queryRunner.query(`DROP TABLE "subject_incidences"`);
    }

}
