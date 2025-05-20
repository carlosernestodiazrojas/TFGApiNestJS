import { MigrationInterface, QueryRunner } from "typeorm";

export class CondominiumPropertyRelation1747517945513 implements MigrationInterface {
    name = 'CondominiumPropertyRelation1747517945513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "properties" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "is_bookable" boolean NOT NULL, "daily_capacity" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL, "deleted_at" TIMESTAMP, "condominium_id" uuid, CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_36ff5bf1152340da4517a8a5a17" FOREIGN KEY ("condominium_id") REFERENCES "condominiums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_36ff5bf1152340da4517a8a5a17"`);
        await queryRunner.query(`DROP TABLE "properties"`);
    }

}
