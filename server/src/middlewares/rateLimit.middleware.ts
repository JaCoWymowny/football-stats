import rateLimit from 'express-rate-limit';
import { Request } from 'express';

export const rateLimiter = rateLimit({
  windowMs: 60 * 500,
  limit: 10,
  keyGenerator: (req: Request) => {
    const user = req.user;
    return user && user.id ? user.id.toString() : req.ip || 'default';
  },
  handler: (req, res) => {
    res.status(429).json({
      message: 'Przekroczono limit zapytań. Spróbuj ponownie później.',
    });
  },
  standardHeaders: true,
  legacyHeaders: false,
});
