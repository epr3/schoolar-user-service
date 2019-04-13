import { getRepository } from 'typeorm';
import { Student } from '../entities/student';
import { Response, Request, NextFunction } from 'express';

export default {
  async getStudents(req: Request, res: Response, next: NextFunction) {
    try {
      const students = await getRepository(Student).find({
        where: {
          userId: req.query.userId
        }
      });
      res.status(200).send(students);
    } catch (e) {
      next(e);
    }
  },
  async getStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const student = await getRepository(Student).findOneOrFail(req.params.id);
      res.status(200).send(student);
    } catch (e) {
      next(e);
    }
  },
  async postStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const student = await getRepository(Student).create(req.body);
      const response = await getRepository(Student).save(student);
      res.status(200).send(response);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  async removeStudent(req: Request, res: Response, next: NextFunction) {
    try {
      await getRepository(Student).delete(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  async updateStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const student = await getRepository(Student).update(
        req.params.id,
        req.body
      );
      res.status(200).send(student);
    } catch (e) {
      next(e);
    }
  }
};
