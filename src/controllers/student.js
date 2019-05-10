const { Student } = require('../models');

module.exports = {
  async getStudents(req, res, next) {
    try {
      const query = {
        userId: req.query.userId
      };
      let students = [];
      if (query.userId) {
        students = await Student.forge({
          userId: req.query.userId
        }).fetchAll();
      }
      students = await Student.forge().fetchAll();
      res.status(200).send(students.toJSON());
    } catch (e) {
      next(e);
    }
  },
  async getStudent(req, res, next) {
    try {
      const student = await Student.forge({ id: req.params.id }).fetch({
        require: true
      });
      res.status(200).send(student.toJSON());
    } catch (e) {
      next(e);
    }
  },
  async postStudent(req, res, next) {
    try {
      const student = await Student.forge({ ...req.body }).save();
      res.status(200).send(student.toJSON());
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  async removeStudent(req, res, next) {
    try {
      const student = await Student.forge({ id: req.params.id }).fetch({
        require: true
      });
      await student.destroy();
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  async updateStudent(req, res, next) {
    try {
      const student = await Student.forge({ id: req.params.id }).fetch({
        require: true
      });
      const studentObj = await student.save({ ...req.body });
      res.status(200).send(studentObj.toJSON());
    } catch (e) {
      next(e);
    }
  }
};
