import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1555237518323 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "professor" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "surname" varchar NOT NULL, "title" varchar NOT NULL, "telephone" varchar NOT NULL, "userId" varchar NOT NULL, CONSTRAINT "UQ_5c30960d3b0cd311554ae724f72" UNIQUE ("userId"))`);
        await queryRunner.query(`CREATE TABLE "student" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "surname" varchar NOT NULL, "telephone" varchar NOT NULL, "groupId" varchar, "userId" varchar NOT NULL, CONSTRAINT "UQ_b35463776b4a11a3df3c30d920a" UNIQUE ("userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "professor"`);
    }

}
