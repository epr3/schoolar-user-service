import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1553020284382 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "test" ("id" varchar PRIMARY KEY NOT NULL, "publicTest" boolean NOT NULL, "subjectId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "question" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "imagePath" varchar NOT NULL, "testId" varchar)`);
        await queryRunner.query(`CREATE TABLE "answer" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "isCorrect" boolean NOT NULL, "questionId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_question" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "imagePath" varchar NOT NULL, "testId" varchar, CONSTRAINT "FK_2c8f911efa2fb5b0fe1abe92020" FOREIGN KEY ("testId") REFERENCES "test" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_question"("id", "description", "imagePath", "testId") SELECT "id", "description", "imagePath", "testId" FROM "question"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`ALTER TABLE "temporary_question" RENAME TO "question"`);
        await queryRunner.query(`CREATE TABLE "temporary_answer" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "isCorrect" boolean NOT NULL, "questionId" varchar, CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_answer"("id", "description", "isCorrect", "questionId") SELECT "id", "description", "isCorrect", "questionId" FROM "answer"`);
        await queryRunner.query(`DROP TABLE "answer"`);
        await queryRunner.query(`ALTER TABLE "temporary_answer" RENAME TO "answer"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "answer" RENAME TO "temporary_answer"`);
        await queryRunner.query(`CREATE TABLE "answer" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "isCorrect" boolean NOT NULL, "questionId" varchar)`);
        await queryRunner.query(`INSERT INTO "answer"("id", "description", "isCorrect", "questionId") SELECT "id", "description", "isCorrect", "questionId" FROM "temporary_answer"`);
        await queryRunner.query(`DROP TABLE "temporary_answer"`);
        await queryRunner.query(`ALTER TABLE "question" RENAME TO "temporary_question"`);
        await queryRunner.query(`CREATE TABLE "question" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "imagePath" varchar NOT NULL, "testId" varchar)`);
        await queryRunner.query(`INSERT INTO "question"("id", "description", "imagePath", "testId") SELECT "id", "description", "imagePath", "testId" FROM "temporary_question"`);
        await queryRunner.query(`DROP TABLE "temporary_question"`);
        await queryRunner.query(`DROP TABLE "answer"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "test"`);
    }

}
