const { Professor } = require('../models');

module.exports = {
  async getProfessors(req, res, next) {
    try {
      const query = {
        userId: req.query.userId
      };
      let professors = [];
      if (query.userId) {
        professors = await Professor.forge({
          userId: req.query.userId
        }).fetchAll();
      }
      professors = await Professor.forge().fetchAll();
      res.status(200).send(professors.toJSON());
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  async getProfessor(req, res, next) {
    try {
      const professor = await Professor.forge({ id: req.params.id }).fetch({
        require: true
      });
      res.status(200).send(professor.toJSON());
    } catch (e) {
      next(e);
    }
  },
  async postProfessor(req, res, next) {
    try {
      const professor = await Professor.forge({ ...req.body }).save();
      res.status(200).send(professor.toJSON());
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  async removeProfessor(req, res, next) {
    try {
      const professor = await Professor.forge({ id: req.params.id })
        .fetch({ require: true })
        await professor.destroy();
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  async updateProfessor(req, res, next) {
    try {
      delete req.body.id;
      const professor = await Professor.forge({ id: req.params.id }).fetch({
        require: true
      });
      const updatedProfessor = await professor.save({ ...req.body });
      res.status(200).send(updatedProfessor.toJSON());
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
};
