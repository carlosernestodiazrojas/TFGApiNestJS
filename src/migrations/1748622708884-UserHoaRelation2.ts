import { MigrationInterface, QueryRunner } from "typeorm";

export class UserHoaRelation21748622708884 implements MigrationInterface {
    name = 'UserHoaRelation21748622708884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8626488113ddc4dc39034f3bbed"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8626488113ddc4dc39034f3bbed" FOREIGN KEY ("hoa_id") REFERENCES "hoas"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8626488113ddc4dc39034f3bbed"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8626488113ddc4dc39034f3bbed" FOREIGN KEY ("hoa_id") REFERENCES "hoas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
