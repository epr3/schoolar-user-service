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

const deleteStudent = async (job: Job, done: DoneCallback) => {
  try {
    await getRepository(Student).delete({
      userId: job.data.userId
    });
    return done();
  } catch (e) {
    return done(new Error(JSON.stringify(e)));
  }
};

export const queueStart = () => {
  queue.process('student.delete', 5, async (job: Job, done: DoneCallback) => {
    await deleteStudent(job, done);
  });
};
