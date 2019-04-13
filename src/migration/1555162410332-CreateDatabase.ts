import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1555162410332 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "professor" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "surname" varchar NOT NULL, "title" varchar NOT NULL, "telephone" varchar NOT NULL, "userId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "student" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "surname" varchar NOT NULL, "telephone" varchar NOT NULL, "groupId" varchar, "userId" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "professor"`);
    }

}
