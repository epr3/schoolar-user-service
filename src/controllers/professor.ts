import { getRepository } from 'typeorm';
import { Professor } from '../entities/professor';
import { Response, Request, NextFunction } from 'express';

export default {
  async getProfessors(req: Request, res: Response, next: NextFunction) {
    try {
      const professors = await getRepository(Professor).find({
        where: {
          userId: req.query.userId
        }
      });
      res.status(200).send(professors);
    } catch (e) {
      next(e);
    }
  },
  async getProfessor(req: Request, res: Response, next: NextFunction) {
    try {
      const professor = await getRepository(Professor).findOneOrFail(
        req.params.id
      );
      res.status(200).send(professor);
    } catch (e) {
      next(e);
    }
  },
  async postProfessor(req: Request, res: Response, next: NextFunction) {
    try {
      const professor = await getRepository(Professor).create(req.body);
      const response = await getRepository(Professor).save(professor);
      res.status(200).send(response);
    } catch (e) {
      next(e);
    }
  },
  async removeProfessor(req: Request, res: Response, next: NextFunction) {
    try {
      await getRepository(Professor).delete(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  async updateProfessor(req: Request, res: Response, next: NextFunction) {
    try {
      const professor = await getRepository(Professor).update(
        req.params.id,
        req.body
      );
      res.status(200).send(professor);
    } catch (e) {
      next(e);
    }
  }
};
