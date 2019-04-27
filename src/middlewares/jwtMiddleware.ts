import { verify } from 'jsonwebtoken';
import { UNAUTHORIZED } from './../utils/errors';
import { Request, Response, NextFunction } from 'express';

interface JWT {
  iat: number;
  iss: string;
  sub: string;
  context: {
    email: string;
    id: string;
    role: string;
  };
}

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.header('Authorization').split('JWT ')[1];
    const jwt = verify(auth, process.env.JWT_SECRET) as JWT;
    req.user = { ...jwt.context };
    next();
  } catch (e) {
    next(UNAUTHORIZED());
  }
};
