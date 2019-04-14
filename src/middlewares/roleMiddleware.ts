import { FORBIDDEN } from './../utils/errors';
import { Request, Response, NextFunction } from 'express';

export default (roles: string[]) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (roles.some((item: string) => item === req.user.role)) {
      next();
    } else {
      next(FORBIDDEN());
    }
  } catch (e) {
    next(e);
  }
};
