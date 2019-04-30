import { Professor } from './../src/entities/professor';
import { Student } from './../src/entities/student';
import { getRepository } from 'typeorm';
import { Job, DoneCallback } from 'kue';
import kue = require('kue');

const queue = kue.createQueue({
  redis: {
    host: 'redis',
    port: 6379
  }
});

queue.setMaxListeners(100);

const createStudent = async (job: Job, done: DoneCallback) => {
  try {
    const student = await getRepository(Student).findOne({
      where: { userId: job.data.userId }
    });
    if (!student) {
      const model = await getRepository(Student).create({ ...job.data });
      await getRepository(Student).save(model);
    }
    return done();
  } catch (e) {
    return done(new Error(JSON.stringify(e)));
  }
};

const createProfessor = async (job: Job, done: DoneCallback) => {
  try {
    const professor = await getRepository(Professor).findOne({
      where: { userId: job.data.userId }
    });
    if (!professor) {
      const model = await getRepository(Professor).create({ ...job.data });
      await getRepository(Professor).save(model);
    }
    return done();
  } catch (e) {
    return done(new Error(JSON.stringify(e)));
  }
};

export default () => {
  queue.process(
    'user.student.create',
    5,
    async (job: Job, done: DoneCallback) => {
      await createStudent(job, done);
    }
  );
  queue.process(
    'user.professor.create',
    5,
    async (job: Job, done: DoneCallback) => {
      await createProfessor(job, done);
    }
  );
};
