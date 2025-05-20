import { MigrationInterface, QueryRunner } from "typeorm";

export class VotingsResultsRelation1747520327666 implements MigrationInterface {
    name = 'VotingsResultsRelation1747520327666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "voting_results" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "approve" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL, "deleted_at" TIMESTAMP, "voting_id" uuid, "user_id" uuid, CONSTRAINT "PK_fb5ca7532995c2d9a8200a1fbb8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "voting_results" ADD CONSTRAINT "FK_b1d954f1d168c0ba7b5f1dd0a3b" FOREIGN KEY ("voting_id") REFERENCES "votings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "voting_results" ADD CONSTRAINT "FK_69a0ee1a4c4b78d62576fe0c344" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "voting_results" DROP CONSTRAINT "FK_69a0ee1a4c4b78d62576fe0c344"`);
        await queryRunner.query(`ALTER TABLE "voting_results" DROP CONSTRAINT "FK_b1d954f1d168c0ba7b5f1dd0a3b"`);
        await queryRunner.query(`DROP TABLE "voting_results"`);
    }

}
