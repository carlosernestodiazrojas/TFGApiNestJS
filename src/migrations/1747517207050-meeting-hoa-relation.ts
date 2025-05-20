import { MigrationInterface, QueryRunner } from "typeorm";

export class MeetingHoaRelation1747517207050 implements MigrationInterface {
    name = 'MeetingHoaRelation1747517207050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hoa_meetings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "is_ordinary" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL, "deleted_at" TIMESTAMP, "hoa_id" uuid, CONSTRAINT "PK_b7a224b23523d384d9947b92587" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "hoa_meetings" ADD CONSTRAINT "FK_1a1c5d9934fa425f96df79ce476" FOREIGN KEY ("hoa_id") REFERENCES "hoas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hoa_meetings" DROP CONSTRAINT "FK_1a1c5d9934fa425f96df79ce476"`);
        await queryRunner.query(`DROP TABLE "hoa_meetings"`);
    }

}
