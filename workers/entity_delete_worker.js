const { Professor, Student } = require('../src/models');
const kue = require('kue');

const queue = kue.createQueue({
  prefix: 'user',
  redis: {
    host: 'redis',
    port: 6379
  }
});

queue.setMaxListeners(100);

const deleteStudent = async (job, done) => {
  try {
    const student = await Student.forge({ userId: job.data.id });
    await student.destroy();
    return done();
  } catch (e) {
    return done(new Error(JSON.stringify(e)));
  }
};

const deleteProfessor = async (job, done) => {
  try {
    const professor = await Professor.forge({ userId: job.data.id });
    await professor.destroy();
    return done();
  } catch (e) {
    return done(new Error(JSON.stringify(e)));
  }
};

module.exports = () => {
  queue.process('user.student.delete', 5, async (job, done) => {
    await deleteStudent(job, done);
  });
  queue.process('user.professor.delete', 5, async (job, done) => {
    await deleteProfessor(job, done);
  });
};
