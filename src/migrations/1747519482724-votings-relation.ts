import { MigrationInterface, QueryRunner } from "typeorm";

export class VotingsRelation1747519482724 implements MigrationInterface {
    name = 'VotingsRelation1747519482724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "votings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "voting_entity_type" character varying NOT NULL, "voting_entity_id" uuid NOT NULL, "is_started" boolean NOT NULL, "started_at" TIMESTAMP NOT NULL, "is_finished" boolean NOT NULL, "finished_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL, "deleted_at" TIMESTAMP, CONSTRAINT "PK_d44f8534b8c53dd3e68071ad099" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "votings"`);
    }

}
