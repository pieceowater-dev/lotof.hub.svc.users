import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1728618902052 implements MigrationInterface {
    name = 'Migrations1728618902052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "state" integer DEFAULT '100', "deleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "friendship" ("id" SERIAL NOT NULL, "userId" uuid NOT NULL, "friendId" uuid NOT NULL, CONSTRAINT "PK_dbd6fb568cd912c5140307075cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "friendships" ("userId" uuid NOT NULL, "friendId" uuid NOT NULL, CONSTRAINT "PK_79319c79ccb0d109db66e5faaf9" PRIMARY KEY ("userId", "friendId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_721d9e1784e4eb781d7666fa7a" ON "friendships" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d54199dd09cec12dda4c4a05cd" ON "friendships" ("friendId") `);
        await queryRunner.query(`ALTER TABLE "friendship" ADD CONSTRAINT "FK_303e50cd29767b99cc55ab45c12" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friendship" ADD CONSTRAINT "FK_9372d39ed9833c770cb6d2c5cd1" FOREIGN KEY ("friendId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friendships" ADD CONSTRAINT "FK_721d9e1784e4eb781d7666fa7ab" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "friendships" ADD CONSTRAINT "FK_d54199dd09cec12dda4c4a05cd7" FOREIGN KEY ("friendId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friendships" DROP CONSTRAINT "FK_d54199dd09cec12dda4c4a05cd7"`);
        await queryRunner.query(`ALTER TABLE "friendships" DROP CONSTRAINT "FK_721d9e1784e4eb781d7666fa7ab"`);
        await queryRunner.query(`ALTER TABLE "friendship" DROP CONSTRAINT "FK_9372d39ed9833c770cb6d2c5cd1"`);
        await queryRunner.query(`ALTER TABLE "friendship" DROP CONSTRAINT "FK_303e50cd29767b99cc55ab45c12"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d54199dd09cec12dda4c4a05cd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_721d9e1784e4eb781d7666fa7a"`);
        await queryRunner.query(`DROP TABLE "friendships"`);
        await queryRunner.query(`DROP TABLE "friendship"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
