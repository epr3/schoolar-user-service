import { getRepository } from 'typeorm';
import { Admin } from '../entities/admin';
import { Response, Request, NextFunction } from 'express';

export default {
  async getAdmins(req: Request, res: Response, next: NextFunction) {
    try {
      const admins = await getRepository(Admin).find();
      res.status(200).send(admins);
    } catch (e) {
      next(e);
    }
  },
  async getAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await getRepository(Admin).findOneOrFail(req.params.id);
      res.status(200).send(admin);
    } catch (e) {
      next(e);
    }
  },
  async postAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await getRepository(Admin).create(req.body);
      const response = await getRepository(Admin).save(admin);
      res.status(200).send(response);
    } catch (e) {
      next(e);
    }
  },
  async removeAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      await getRepository(Admin).delete(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  async updateAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await getRepository(Admin).update(req.params.id, req.body);
      res.status(200).send(admin);
    } catch (e) {
      next(e);
    }
  }
};
