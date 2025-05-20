import { MigrationInterface, QueryRunner } from "typeorm";

export class CondominiumHoaRelation1747514681600 implements MigrationInterface {
    name = 'CondominiumHoaRelation1747514681600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "condominiums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "address" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL, "deleted_at" TIMESTAMP, "hoa_id" uuid, CONSTRAINT "PK_bb7509828f6270f35097b88e752" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "incidences" ADD "is_deleted" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "condominiums" ADD CONSTRAINT "FK_e44a2deaa69dd4bc0801e87d23b" FOREIGN KEY ("hoa_id") REFERENCES "hoas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "condominiums" DROP CONSTRAINT "FK_e44a2deaa69dd4bc0801e87d23b"`);
        await queryRunner.query(`ALTER TABLE "incidences" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`DROP TABLE "condominiums"`);
    }

}
