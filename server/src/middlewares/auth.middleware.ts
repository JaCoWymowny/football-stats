import passport from '../config/passport.config';
import { Request, Response, NextFunction } from 'express';
import { User } from '@prisma/client';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: Error | null, user: User | false) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user as User;
    next();
  })(req, res, next);
};
