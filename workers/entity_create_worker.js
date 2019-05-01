const { Professor, Student } = require('../src/models');
const kue = require('kue');

const queue = kue.createQueue({
  redis: {
    host: 'redis',
    port: 6379
  }
});

queue.setMaxListeners(100);

const createStudent = async (job, done) => {
  try {
    const student = await Student.forge({
      userId: req.query.userId
    }).fetch({ require: true });
    if (!student) {
      await Student.forge({ ...job.data }).save();
    }
    return done();
  } catch (e) {
    return done(new Error(JSON.stringify(e)));
  }
};

const createProfessor = async (job, done) => {
  try {
    const professor = await Professor.forge({
      userId: req.query.userId
    }).fetch({ require: true });
    if (!professor) {
      await Professor.forge({ ...job.data }).save();
    }
    if (!professor) {
      const model = await getRepository(Professor).create({ ...job.data });
      await getRepository(Professor).save(model);
    }
    return done();
  } catch (e) {
    return done(new Error(JSON.stringify(e)));
  }
};

module.exports = () => {
  queue.process('user.student.create', 5, async (job, done) => {
    await createStudent(job, done);
  });
  queue.process('user.professor.create', 5, async (job, done) => {
    await createProfessor(job, done);
  });
};
